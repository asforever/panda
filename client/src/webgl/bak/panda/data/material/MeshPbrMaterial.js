import Material from "./Material";
import MaterialConst from "../../const/MaterialConst";

export default class MeshPbrMaterial extends Material {
    constructor(config = {}) {
        super(config);
        this.type = MaterialConst.MESH_PBR_MATERIAL;

        this.metallic = 0.5;
        this.roughness = 0.5;
        this.ao = 1.0;

        this.lightPosition = [
            10.0, 10.0,  10.0,
            10.0, 10.0,  -10.0,
            10.0, -10.0, 10.0,
            10.0, -10.0, -10.0,
        ];
        this.lightColor = [
            500.0, 500.0, 500.0,
            500.0, 500.0, 500.0,
            500.0, 500.0, 500.0,
            500.0, 500.0, 500.0
        ];

        this.normalMap = config.normalMap;
        this.roughnessMap = config.roughnessMap;
        this.metallicMap = config.metallicMap;
        this.aoMap = config.envMap;
    }
}
