#ifdef NUM_DIR_LIGHT
struct DirLight {
   vec3 dir;
   vec3 diffuse;
   vec3 specular;
   float intensity;
};
uniform DirLight dir_lights[NUM_DIR_LIGHT];
void calcDirLight(out vec3 result_color
                   ,vec3 view_dir
                   ,vec3 v_normal
                   ,vec4 material_diff
                   ,vec4 material_spec
                   ,float material_shininess){
   for(int i=0;i<NUM_DIR_LIGHT;i++){
         DirLight light = dir_lights[i];
         vec3 light_dir = normalize(-light.dir);
         vec3 reflect_dir = reflect(-light_dir, v_normal);
         float diff = max(dot(light_dir,v_normal),0.0);
         float spec = pow(max(dot(view_dir, reflect_dir), 0.0), material_shininess);
         vec3 diffuse  =  diff * light.diffuse * material_diff.xyz;
         vec3 specular =  spec * light.specular * material_spec.xyz;
         result_color += (diffuse + specular) * light.intensity;
     }
}
#endif
