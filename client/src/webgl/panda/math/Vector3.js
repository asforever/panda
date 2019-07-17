export default class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    convertToArray() {
        return [this.x, this.y, this.z];
    }

    length() {

        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    }

    multiplyScalar(scalar) {

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    divideScalar(scalar) {

        return this.multiplyScalar(1 / scalar);

    }

    normalize() {

        return this.divideScalar(this.length() || 1);

    }
    
}
