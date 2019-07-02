import Object3D from "./Object3D";
import Matrix3 from "../math/matrix/Matrix3";

export default class Mesh extends Object3D {
    constructor(geometry, material) {
        super();
        this.isMesh = true;
        this.geometry = geometry;
        this.material = material;
        this.normalMatrix = new Matrix3();
    }

    updateMatrix() {
        super.updateMatrix();
        this.normalMatrix = new Matrix3().getNormalMatrix(this.matrix);
    }
}