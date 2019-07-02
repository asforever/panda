import Material from "./Material";
import MaterialConst from "../../const/MaterialConst";

export default class MeshPhongMaterial extends Material {
    constructor(config = {}) {
        super(config);
        this.type = MaterialConst.MESH_PHONG_MATERIAL;
        this.shininess = 32;
        this.specularMap =config.specularMap;
        this.envMap = config.envMap;
        this.reflect = 0.5;
    }
}
