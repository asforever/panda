export default class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    convertToArray() {
        return [this.x, this.y, this.z];
    }
}