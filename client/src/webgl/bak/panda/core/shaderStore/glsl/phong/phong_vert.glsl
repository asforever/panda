uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
uniform mat3 u_normalMatrix;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_uv;

varying vec3  v_position;
varying vec3  v_normal;
varying vec2  v_uv;

void main(){
     vec4 view_position = u_modelViewMatrix * vec4(a_position, 1.0);
     v_uv = a_uv;
     v_normal = u_normalMatrix * a_normal;
     v_position = vec3(view_position);
     gl_Position = u_projectionMatrix * view_position;
}

