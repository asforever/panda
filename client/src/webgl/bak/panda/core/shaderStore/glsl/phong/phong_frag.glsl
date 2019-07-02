uniform vec3 u_cameraPosition;
varying vec3 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

uniform vec4 material_color;
uniform float material_shininess;
uniform float material_reflect;

void main(){
    vec3 view_dir = normalize(u_cameraPosition - v_position);

    vec4 diffuse = material_color;
    #ifdef USE_DIFFUSE_MAP
    diffuse *= texture2D(diffuse_map,v_uv);
    #elif defined( USE_DIFFUSE_MAP_CUBE )
    diffuse *= textureCube(diffuse_map,v_position);
    #endif

    vec4 specular = vec4(1.0);
    #ifdef USE_SPECULAR_MAP
    specular = texture2D(specular_map,v_uv);
    #elif defined( USE_SPECULAR_MAP_CUBE )
    specular = textureCube(specular_map,v_position);
    #endif

    #ifdef USE_ENV_MAP_CUBE
    vec3 R = reflect(-view_dir, v_normal);
    vec4 env = textureCube(env_map,R);
    diffuse = diffuse * (1. - env.a * material_reflect) + env * material_reflect;
    #endif

    vec3 result_color = vec3(0.0);
    calcAllLight(result_color,view_dir,v_normal,v_position,diffuse,specular,material_shininess);
    gl_FragColor = vec4(result_color,diffuse.a);
}
