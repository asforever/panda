precision mediump float;
varying vec2 v_uv;
uniform vec4 material_color;

void main(){
  vec4 diffuse = material_color;
  #ifdef USE_DIFFUSE_MAP
  diffuse *= texture2D(diffuse_map,v_uv);
  #elif defined( USE_DIFFUSE_MAP_CUBE )
  diffuse *= textureCube(diffuse_map,v_position);
  #endif

  float average =  0.2126 * diffuse.r + 0.7152 * diffuse.g + 0.0722 * diffuse.b;
  gl_FragColor = vec4(vec3(average),diffuse.a);
}

