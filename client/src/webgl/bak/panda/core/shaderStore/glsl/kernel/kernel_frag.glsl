varying vec2 v_uv;

uniform vec4 material_color;
uniform float kernel[9];
uniform float offset;
vec2 offsets[9];
vec3 sampleTex[9];

void main()
{
    offsets[0] = vec2(-offset,  offset);
    offsets[1] = vec2(      0.0,  offset);
    offsets[2] = vec2( offset,  offset);
    offsets[3] = vec2(-offset,      0.0);
    offsets[4] = vec2(      0.0,      0.0);
    offsets[5] = vec2( offset,       0.0);
    offsets[6] = vec2(-offset, -offset);
    offsets[7] = vec2(     0.0,  -offset);
    offsets[8] = vec2( offset,  -offset);

    for(int i = 0; i < 9; i++)
    {
        #ifdef USE_DIFFUSE_MAP
        sampleTex[i] = texture2D(diffuse_map, v_uv + offsets[i]).xyz;
        #elif defined( USE_DIFFUSE_MAP_CUBE )
        sampleTex[i] = textureCube(diffuse_map,v_position  + vec3(offsets[i],0.0)).xyz;
        #endif
    }

    vec3 col = vec3(0.0);
    for(int i = 0; i < 9; i++)
        col += sampleTex[i] * kernel[i];
    gl_FragColor = vec4(col, 1.0) * material_color;
}

