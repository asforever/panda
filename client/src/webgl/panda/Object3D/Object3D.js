export default class Object3D {
    constructor() {
        this.children = [];
    }

    add(child) {
        this.children.push(child);
    }
}
