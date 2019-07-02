import Material from "./Material";
import MaterialConst from "../../const/MaterialConst";

export default class MeshInversionMaterial extends Material {
    constructor(config) {
        super(config);
        this.type = MaterialConst.MESH_INVERSION_MATERIAL;
    }
}
