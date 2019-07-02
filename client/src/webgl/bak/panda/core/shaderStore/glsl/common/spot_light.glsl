#ifdef NUM_SPOT_LIGHT
struct SpotLight {
  float constant;
  float linear;
  float quadratic;
  float intensity;

  vec3 position;
  vec3 dir;
  float cut_off;
  float outer_cut_off;
  vec3 diffuse;
  vec3 specular;
};
uniform SpotLight spot_lights[NUM_SPOT_LIGHT];
void calcSpotLight(out vec3 result_color
                   ,vec3 view_dir
                   ,vec3 v_normal
                   ,vec3 v_position
                   ,vec4 material_diff
                   ,vec4 material_spec
                   ,float material_shininess){
   for(int i=0;i<NUM_SPOT_LIGHT;i++){
         SpotLight light = spot_lights[i];
         vec3 pos_to_light = light.position - v_position;
         float distance = length(pos_to_light);
         vec3 light_dir = normalize(pos_to_light);
         float diff = max(dot(v_normal,light_dir),0.0);
         vec3 reflect_dir = reflect(-light_dir, v_normal);
         float spec = pow(max(dot(view_dir, reflect_dir), 0.0), material_shininess);

         float attenuation = 1.0 / (light.constant + light.linear * distance
         + light.quadratic * (distance * distance));

         //diff point light
         float theta = dot(light_dir, normalize(-light.dir));
         float epsilon = light.cut_off - light.outer_cut_off;
         float intensity = clamp((theta - light.outer_cut_off) / epsilon, 0.0, 1.0);
         //

         vec3 diffuse  =  diff * light.diffuse * material_diff.xyz;
         vec3 specular =  spec * light.specular * material_spec.xyz;
         result_color += (diffuse + specular)* attenuation * intensity * light.intensity;
     }
}
#endif
