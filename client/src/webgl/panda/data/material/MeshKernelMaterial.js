import Material from "./Material";
import MaterialConst from "../../const/MaterialConst";

export default class MeshKernelMaterial extends Material {
    constructor(config) {
        super(config);
        this.type = MaterialConst.MESH_KERNEL_MATERIAL;
        this.offset =1/100;
        this.kernel =
            [-1,-1,-1
            ,-1, 9,-1
            ,-1,-1,-1]
    }
}
