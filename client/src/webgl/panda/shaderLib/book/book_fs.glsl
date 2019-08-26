out vec4 FragColor;
in vec2 TexCoords;
in vec3 WorldPos;
in vec3 Normal;

uniform vec2 mouse;
uniform float width;
uniform float height;
uniform float iTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

const float pi = 3.14159;
const float twopi = 6.28319;

const float e0 = 0.018;
const float ppow = 2.0;

const float bcolorMix = 0.67;
const float maxBcolVal = 0.4;

const float diffint = 1.2;
const float ambientt = 0.1;
const float ambientb = 0.4;

const vec2 specpos = vec2(0.85, -0.2);
const float specpow = 5.;
const float specwidth = 0.4;
const float specint = 0.6;

const vec2 shadowoffset = vec2(0.07, -0.04);
const float shadowsmoothness = 0.012;
const float shadowint = 0.25;

const float aawidth = 0.01;
const int aasamples = 3;

const bool showpoints = false;
const bool colors = false;
const bool anim = false;

//#define swap_x

// Simple "random" function
float random(float co)
{
    return fract(sin(co*12.989) * 43758.545);
}

vec4 getPagebackColor()
{

    float cn;
    if (mouse.x==0. && mouse.y==0. && anim)
        cn = floor(iTime/3.5);
    else
        cn = 1.0;
    vec4 pagebackColor;
    pagebackColor.r = maxBcolVal*random(cn + 263.714);
    pagebackColor.g = maxBcolVal*random(cn*4. - 151.894);
    pagebackColor.b = maxBcolVal*random(cn*7. + 87.548);
    pagebackColor.a = 1.0;
    return pagebackColor;
}

vec2 rotateVec(vec2 vect, float angle)
{
    float xr = vect.x*cos(angle) + vect.y*sin(angle);
    float yr = vect.x*sin(angle) - vect.y*cos(angle);
    return vec2(xr, yr);
}

// Curl function on the axis bottom left corner - corner of the sheet
float pageFunction(float x, float e)
{
    return pow(pow(x, ppow) - e, 1./ppow);
}

// Derivate of the curl function for light calculations
float pageFunctionDer(float x, float e)
{
    return pow(x, ppow - 1.)/pow(pow(x, ppow) - e, (ppow - 1.)/ppow);
}

vec4 turnPage(vec2 fragCoord,vec2 uv)
{
	// General calculations
    float ratio = width/height;

    // As long as one doesn't click on the canvas, the animation runs

    vec2 mouse2 = mouse;
    #ifdef swap_x
    mouse2.x = width - mouse.x;
    #endif

    mouse2.x = max(min(mouse2.x,ratio),0.001);
    mouse2.y = max(min(sqrt(pow(ratio/2.,2.) - pow(mouse2.x - ratio/2.,2.)),mouse2.y),0.0002);

    vec2 mpoint = mouse2;

    vec2 midmpoint = mpoint*0.5;
    vec2 midmpointUV = midmpoint/vec2(height,height);

    float mdist = distance(fragCoord, mpoint);
    float angle = atan(mpoint.y/mpoint.x);

    vec2 uvr = rotateVec(uv -  midmpointUV, angle);
    float midBottomX = length(midmpointUV)/cos(-angle);

    float curl = pow(ratio/2. - midBottomX, 1.);
    //curl *=pow(length(mpoint),4.);

    float e = curl * (e0*pow(mdist/height, 2.) + 0.02*e0*smoothstep(0., 0.12, mdist/height));
    float pagefunc = pageFunction(uvr.x, e);
    vec2 uvr2 = vec2(pagefunc, uvr.y);
    vec2 uvr3 = rotateVec(uvr2, -angle) - vec2(1., -1.)*midmpointUV;

    vec2 uvr2b = vec2(-pagefunc, uvr.y);
    vec2 uvr3b = rotateVec(uvr2b, -angle) - vec2(1., -1.)*midmpointUV;

    vec4 i;
    // Turned page
    if (uvr.x>0. && uvr3b.y>0.)
    {
        vec2 uvcorr = vec2(ratio, 1.);
        vec2 uvrcorr = rotateVec(uvcorr - midmpointUV, angle);
        float pagefunccorr = pageFunction(uvrcorr.x, e);
        vec2 uvrcorr2 = vec2(-pagefunccorr, uvrcorr.y);
        vec2 uvrcorr3 = rotateVec(uvrcorr2, -angle) - vec2(1., -1.)*midmpointUV;

        float pagefuncder = pageFunctionDer(uvr.x, e);
        float intfac = 1. - diffint*(1. - 1./pagefuncder);

        if(uvr3.x>=0. || uvr3.y<=0.)
        {
            // Top of the turned page
        	float mdists = distance(fragCoord, mpoint)*0.7 - 55.;
        	float es = e0*pow(mdists/height, 2.) + 0.02*e0*smoothstep(0., 0.08, mdist/height);
        	vec2 uvrs = rotateVec(uv -midmpointUV - shadowoffset, angle);
        	float pagefuncs = pageFunction(uvrs.x + 0.015, es - 0.001);
        	vec2 uvr2s = vec2(pagefuncs, uvrs.y);
        	vec2 uvr3s = rotateVec(uvr2s, -angle) - vec2(1., -1.)*midmpointUV;
        	float shadow = 1. - (1. - smoothstep(-shadowsmoothness, shadowsmoothness, uvr3s.x))*(1. - smoothstep(shadowsmoothness, -shadowsmoothness, uvr3s.y));

            float difft = intfac*(1. - ambientt) + ambientt;
        	difft = difft*(shadow*shadowint + 1. - shadowint)/2. + mix(1. - shadowint, difft, shadow)/2.;
            i = texture(iChannel0, mod((uvr3b - uvrcorr3)/vec2(ratio, 1.), 1.));
        }
        else
        {
            // Bottom of the turned page
            float diffb = intfac*(1. - ambientb) + ambientb;
        	float spec = pow(smoothstep(specpos.x - 0.35, specpos.x, intfac)*smoothstep(specpos.x + 0.35, specpos.x, intfac), specpow);
        	spec*= min(curl*10.,1.)*specint*pow(1. - pow(clamp(abs(uvr.y - specpos.y), 0., specwidth*2.), 2.)/specwidth, specpow);

        	vec4 bottomUV = texture(iChannel1, mod((uvr3 - uvrcorr3)/vec2(ratio, 1.),1.));
            i = diffb*(colors?vec4(0.3, 1.0, 0.3, 1.):mix(bottomUV, getPagebackColor(), bcolorMix));
            i = mix(i, vec4(1.0), spec);
        }
    }
    else
    {
        // "Background" with simple shadow

        vec2 mpointbg = vec2(0.2, 0.01);
        vec2 midmpointbg = mpointbg*0.5;
        float mdistbg = distance(fragCoord, mpointbg);
        float ebg = e0*pow(mdistbg/height, 2.) + 0.01*e0*smoothstep(0., 0.12, mdistbg/height);
        float anglebg = 0.001; //- atan(mpointbg.x/mpointbg.y) + pi*0.5;
        vec2 uvrbg = rotateVec(uv - midmpointbg/height, anglebg);
        //float pagefuncbg = mix(uvrbg.x, pageFunction(uvrbg.x, ebg), clamp(uvrbg.x*5., 0., 1.));
        float pagefuncbg;
        if (uvrbg.x<0.15)
           pagefuncbg = uvrbg.x;
        else
           pagefuncbg = mix(uvrbg.x, pageFunction(uvrbg.x, ebg), smoothstep(mpoint.x/width + 0.1, mpoint.x/width, uvrbg.x));

        vec2 uvr2bbg = vec2(-pagefuncbg, uvrbg.y);
        vec2 uvr3bbg = rotateVec(uvr2bbg, -anglebg) - vec2(1., -1.)*midmpointbg/vec2(height,height);
        vec2 uvcorrbg = vec2(ratio, 1.);
        vec2 uvrcorrbg = rotateVec(uvcorrbg - midmpointbg/vec2(height,height), anglebg);
        float pagefunccorrbg = pageFunction(uvrcorrbg.x, ebg);
        vec2 uvrcorr2bg = vec2(-pagefunccorrbg, uvrcorrbg.y);
        vec2 uvrcorr3bg = rotateVec(uvrcorr2bg, -anglebg) - vec2(1., -1.)*midmpointbg/vec2(height,height);
        float pagefuncderbg = pageFunctionDer(uvrbg.x, ebg);
        float intfacbg = 1. - diffint*(1. - 1./pagefuncderbg);
        float difftbg = intfacbg*(1. - ambientt) + ambientt;
        i = colors?difftbg*vec4(0.3, 0.3, 1., 1.):texture(iChannel1, mod((uvr3bbg - uvrcorr3bg)/vec2(-ratio, 1.), 1.));
        float bgshadow = 1. + shadowint*smoothstep(-0.08+shadowsmoothness*4., -0.08, uvr3b.y) - shadowint;

        if (uvr3b.y<0.)
           i*= bgshadow;
    }
    return i;
}

void main()
{

	float ratio =width/height;
	vec2 fragCoord = TexCoords*vec2(width,height);
	vec2 uv = vec2(TexCoords.x*ratio,TexCoords.y);

    #ifdef swap_x
    uv.x = ratio - uv.x;
    fragCoord.x = width - fragCoord.x;
    #endif

    // Antialiasing
    vec4 vs = vec4(0.);
    for (int j=0;j<aasamples ;j++)
    {
       float oy = float(j)*aawidth/max(float(aasamples-1), 1.);
       for (int i=0;i<aasamples ;i++)
       {
          float ox = float(i)*aawidth/max(float(aasamples-1), 1.);
          vs+= turnPage(fragCoord + vec2(ox, oy),uv);
       }
    }
    vec4 ocol = vs/vec4(aasamples*aasamples);
    FragColor = ocol;
}
