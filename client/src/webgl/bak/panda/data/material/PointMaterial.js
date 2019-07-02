import Material from "./Material";
import MaterialConst from "../../const/MaterialConst";

export default class PointMaterial extends Material {
    constructor(config) {
        super(config);
        this.type = MaterialConst.MESH_BASIC_MATERIAL;
    }
}
