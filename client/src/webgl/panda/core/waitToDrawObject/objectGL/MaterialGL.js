import CacheStateMediator from "../../mediator/CacheStateMediator";
import MaterialConst from "../../../const/MaterialConst";

export default class MaterialGL{
    constructor() {
        this.programInfo = null;
        this.uniforms = {};
        this.capabilities = {};
    }

    parse(state,cache, material,shaderStoreGL) {
        let programInfo
            , map = material.map
            , specularMap = material.specularMap
            , envMap = material.envMap
            , uniforms = {}
            , capabilities = material;

        let shaderSource = shaderStoreGL.parseMaterial(material);
        programInfo = CacheStateMediator.loadProgramInfoFromCache({state,cache, uuid:shaderSource.id, shaderSource});

        if (map){
            uniforms["diffuse_map"] = CacheStateMediator.loadTextureFromCache({state,cache, map});
        }
        if (specularMap) {
            uniforms["specular_map"] = CacheStateMediator.loadTextureFromCache({state,cache, map:specularMap});
        }
        if (envMap) {
            uniforms["env_map"] = CacheStateMediator.loadTextureFromCache({state,cache, map:envMap});
        }

        let colorArr = material.color.toArray3();
        colorArr.push(material.color.a * material.opacity);
        uniforms["material_color"] = colorArr;


        if(material.type === MaterialConst.MESH_KERNEL_MATERIAL){
            uniforms["kernel"] = material.kernel;
            uniforms["offset"] = material.offset;
        }
        if(material.type === MaterialConst.MESH_PHONG_MATERIAL){
            uniforms["material_shininess"] = material.shininess;
            uniforms["material_reflect"] = material.reflect;
        }

        if(material.type === MaterialConst.MESH_PBR_MATERIAL){
            uniforms["metallic"] = material.metallic;
            uniforms["roughness"] = material.roughness;
            uniforms["ao"] = material.ao;
            uniforms["light_position"] = material.lightPosition;
            uniforms["light_color"] = material.lightColor;


        }

        this.programInfo = programInfo;
        this.uniforms = uniforms;
        this.capabilities = capabilities;
    }
}
