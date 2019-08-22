import * as glm from "gl-matrix";

export default class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.data = glm.vec3.set(glm.vec3.create(), x, y, z);
    }

    get x() {
        return this.data[0];
    }

    get y() {
        return this.data[1];
    }

    get z() {
        return this.data[2];
    }


    set(x, y, z) {
        glm.vec3.set(this.data, x, y, z);
    }

    add(vec3) {
        glm.vec3.add(this.data, this.data, vec3.data);
    }


    sub(vec3) {
        glm.vec3.sub(this.data, this.data, vec3.data);
    }

    distanceTo(vec3) {
        const result = glm.vec3.sub(glm.vec3.create(), this.data, vec3.data);
        return glm.vec3.length(result);
    }

    normalize(){
        glm.vec3.normalize(this.data,this.data);
        return this;
    }


}
