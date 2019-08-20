import * as glm from "gl-matrix";

export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.data = glm.vec2.set(glm.vec2.create(), x, y);
    }

    get x() {
        return this.data[0];
    }

    get y() {
        return this.data[1];
    }

    set(x, y) {
        glm.vec2.set(this.data, x, y);
    }

    add(vec2) {
        glm.vec2.add(this.data, this.data, vec2.data);
    }


    sub(vec2) {
        glm.vec2.sub(this.data, this.data, vec2.data);
    }

    distanceTo(vec2) {
        const result = glm.vec2.sub(glm.vec2.create(), this.data, vec2.data);
        return glm.vec2.length(result);
    }


}
