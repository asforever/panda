import * as glm from "gl-matrix";

export default class Matrix4 {
    constructor(x = 0, y = 0) {
        this.data = glm.mat4.create();
    }

    rotationByAxis(angle, axis) {
        glm.mat4.rotate(this.data, this.data, angle, axis.data);
    }
}
