#version 300 es

precision mediump  float;

in vec3 worldPos;

uniform sampler2D equirectangularMap;

out vec4 FragColor;

void main()
{
    FragColor = vec4(worldPos,1.0);
}
