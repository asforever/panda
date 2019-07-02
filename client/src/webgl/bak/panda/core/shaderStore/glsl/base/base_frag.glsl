
varying vec3 v_position;
varying vec2 v_uv;

uniform vec4 material_color;

void main(void) {

    vec4 diffuse = material_color;
    #ifdef USE_DIFFUSE_MAP
    diffuse *= texture2D(diffuse_map,v_uv);
    #elif defined( USE_DIFFUSE_MAP_CUBE )
    diffuse *= textureCube(diffuse_map,v_position);
    #endif

    gl_FragColor = diffuse;
}
