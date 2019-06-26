import Matrix4 from "../../math/matrix/Matrix4";
import Object3D from "../Object3D";

export default class PerspectiveCamera extends Object3D {
    constructor(fov, aspect, near, far) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.zoom = 1;
        this.projectionMatrix = new Matrix4();
        this.matrixInverse = new Matrix4();
        this.updateProjectionMatrix();
    }

    lookAt(target) {
        super.lookAt(target);
        this.matrixInverse.getInverse(this.matrix);
        this.matrixInverse.needsUpdate = true;
    }

    updateProjectionMatrix() {
        let near = this.near,
            top = near * Math.tan(Math.PI / 180 * 0.5 * this.fov) / this.zoom,
            height = 2 * top,
            width = this.aspect * height,
            left = -0.5 * width;

        this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
        this.projectionMatrix.needsUpdate = true;
    }
}
