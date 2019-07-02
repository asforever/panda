import Material from "./Material";
import MaterialConst from "../../const/MaterialConst";

export default class MeshGrayscaleMaterial extends Material {
    constructor(config) {
        super(config);
        this.type =MaterialConst.MESH_GRAYSCALE_MATERIAL;
    }
}
