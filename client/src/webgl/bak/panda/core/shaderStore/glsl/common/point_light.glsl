#ifdef NUM_POINT_LIGHT
struct PointLight {
  float constant;
  float linear;
  float quadratic;
  float intensity;

  vec3 position;
  vec3 diffuse;
  vec3 specular;
};
uniform PointLight point_lights[NUM_POINT_LIGHT];
void calcPointLight(out vec3 result_color
                   ,vec3 view_dir
                   ,vec3 v_normal
                   ,vec3 v_position
                   ,vec4 material_diffuse
                   ,vec4 material_specular
                   ,float material_shininess){
   for(int i=0;i<NUM_POINT_LIGHT;i++){
         PointLight light = point_lights[i];
         vec3 pos_to_light = light.position - v_position;
         float distance = length(pos_to_light);
         vec3 light_dir = normalize(pos_to_light);
         float diff = max(dot(v_normal,light_dir),0.0);
         vec3 reflect_dir = reflect(-light_dir, v_normal);
         float spec = pow(max(dot(view_dir, reflect_dir), 0.0), material_shininess);

         float attenuation = 1.0 / (light.constant + light.linear * distance
         + light.quadratic * (distance * distance));

         vec3 diffuse  =  diff * light.diffuse * material_diffuse.xyz;
         vec3 specular =  spec * light.specular * material_specular.xyz;
         result_color += (diffuse + specular)* attenuation * light.intensity;
     }
}
#endif
