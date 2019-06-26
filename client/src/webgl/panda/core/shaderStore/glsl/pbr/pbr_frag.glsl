const float PI = 3.14159265359;

uniform vec3 u_cameraPosition;
varying vec3 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

uniform vec4  material_color;
uniform float metallic;
uniform float roughness;
uniform float ao;

uniform vec3 light_position[4];
uniform vec3 light_color[4];


vec3 getNormalFromMap(sampler2D normal_map,vec2 v_uv)
{
    vec3 tangentNormal = texture2D(normal_map, v_uv).xyz * 2.0 - 1.0;

    vec3 Q1  = dFdx(v_position);
    vec3 Q2  = dFdy(v_position);
    vec2 st1 = dFdx(v_uv);
    vec2 st2 = dFdy(v_uv);

    vec3 N   = normalize(v_normal);
    vec3 T  = normalize(Q1*st2.t - Q2*st1.t);
    vec3 B  = -normalize(cross(N, T));
    mat3 TBN = mat3(T, B, N);

    return normalize(TBN * tangentNormal);
}

float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a      = roughness*roughness;
    float a2     = a*a;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2  = GeometrySchlickGGX(NdotV, roughness);
    float ggx1  = GeometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

void main(){
    vec3  result_diffuse = pow(material_color.rgb,vec3(2.2));
    vec3  result_normal = v_normal;
    float result_metallic = metallic;
    float result_roughness = roughness;
    float result_ao = ao;

    #ifdef USE_DIFFUSE_MAP
    result_diffuse *= pow(texture2D(diffuse_map,v_uv).rgb,vec3(2.2));
    #elif defined( USE_DIFFUSE_MAP_CUBE )
    result_diffuse *= pow(textureCube(diffuse_map,v_position).rgb,2.2);
    #endif

    #ifdef USE_METALLIC_MAP
    result_metallic = texture2D(metallic_map,v_uv).r;
    #endif

    #ifdef USE_ROUGHNESS_MAP
    result_roughness = texture2D(roughness_map,v_uv).r;
    #endif

    #ifdef USE_AO_MAP
    result_ao = texture2D(ao_map,v_uv);
    #endif

    #ifdef USE_NORMAL_MAP
    result_normal = getNormalFromMap(normal_map,v_uv).r;
    #endif

    vec3 V = normalize(u_cameraPosition - v_position);
    vec3 Lo = vec3(0.0);
    vec3 F0 = vec3(0.04);
    F0 = mix(F0, result_diffuse, result_metallic);

    for(int i = 0; i < 4; ++i)
    {
        vec3 N = normalize(result_normal);
        vec3 L = normalize(light_position[i] - v_position);
        vec3 H = normalize(V + L);
        float distance    = length(light_position[i] - v_position);
        float attenuation = 1.0 / (distance * distance);
        vec3 radiance     = light_color[i] * attenuation;

        float NDF = DistributionGGX(N, H, roughness);
        float G   = GeometrySmith(N, V, L, roughness);
        vec3 F    = fresnelSchlick(max(dot(H, V), 0.0), F0);

        vec3 kS = F;
        vec3 kD = vec3(1.0) - kS;
        kD *= 1.0 - metallic;

        vec3 nominator    = NDF * G * F;
        float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.001;
        vec3 specular     = nominator / denominator;

        // add to outgoing radiance Lo
        float NdotL = max(dot(N, L), 0.0);
        Lo += (kD * result_diffuse / PI + specular) * radiance * NdotL;
    }

    vec3 ambient = vec3(0.03) * result_diffuse * result_ao;
    vec3 color = ambient + Lo;

    color = color / (color + vec3(1.0));
    color = pow(color, vec3(1.0/2.2));

    gl_FragColor = vec4(color, 1.0);
}
