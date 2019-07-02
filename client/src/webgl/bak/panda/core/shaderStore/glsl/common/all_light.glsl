void calcAllLight(
        out vec3 result_color
        ,vec3 view_dir
        ,vec3 v_normal
        ,vec3 v_position
        ,vec4 material_diffuse
        ,vec4 material_specular
        ,float material_shininess){

        #ifdef NUM_AMB_LIGHT
        calcAmbientLight(result_color,material_diffuse);
        #endif

        #ifdef NUM_DIR_LIGHT
        calcDirLight(result_color,view_dir,v_normal,material_diffuse,material_specular,material_shininess);
        #endif

        #ifdef NUM_POINT_LIGHT
        calcPointLight(result_color,view_dir,v_normal,v_position,material_diffuse,material_specular,material_shininess);
        #endif

        #ifdef NUM_SPOT_LIGHT
        calcSpotLight(result_color,view_dir,v_normal,v_position,material_diffuse,material_specular,material_shininess);
        #endif
}
