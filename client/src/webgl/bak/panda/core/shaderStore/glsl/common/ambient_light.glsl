#ifdef NUM_AMB_LIGHT
struct AmbientLight {
   vec3 ambient;
   float intensity;
};
uniform AmbientLight ambient_lights[NUM_AMB_LIGHT];
void calcAmbientLight(out vec3 result_color,vec4 material_diff){
     for(int i=0;i<NUM_AMB_LIGHT;i++){
           AmbientLight light = ambient_lights[i];
           result_color+= light.ambient * light.intensity * material_diff.xyz;
     }
}
#endif
