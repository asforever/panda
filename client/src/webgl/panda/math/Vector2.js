import * as glm from "gl-matrix";

export default class Vector2 {
    constructor(x, y) {
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

    distanceTo(vec2) {
        const result = glm.vec2.sub(glm.vec2.create(), this.data, vec2.data);
        return glm.vec2.length(result);
    }


}
