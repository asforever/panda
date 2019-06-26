import Quaternion from "./Quaternion";

export default class Vector3 {
    constructor(x, y, z) {
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
    }
    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    get z() {
        return this._z
    }

    set x(v) {
        this._x = v || 0;
        this.onChange();
    }

    set y(v) {
        this._y = v || 0;
        this.onChange();
    }

    set z(v) {
        this._z = v || 0;
        this.onChange();
    }

    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        this.onChange();
    }

    add(v) {
        this._x += v.x;
        this._y += v.y;
        this._z += v.z;
        this.onChange();
        return this;
    }

    applyQuaternion(q) {

        let x = this.x, y = this.y, z = this.z;
        let qx = q.x, qy = q.y, qz = q.z, qw = q.w;

        // calculate quat * vector

        let ix = qw * x + qy * z - qz * y;
        let iy = qw * y + qz * x - qx * z;
        let iz = qw * z + qx * y - qy * x;
        let iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        this._x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this._y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this._z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        this.onChange();
        return this;

    }

    applyEuler = (() => {

        let quaternion = new Quaternion();

        return (euler) => {

            if (!(euler && euler.isEuler)) {

                console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');

            }

            return this.applyQuaternion(quaternion.setFromEuler(euler));

        };

    })();

    applyMatrix4(m) {

        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;

        let w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

        this._x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this._y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this._z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        this.onChange();
        return this;

    }

    setFromMatrixPosition ( m ) {

        let e = m.elements;

        this.x = e[ 12 ];
        this.y = e[ 13 ];
        this.z = e[ 14 ];

        return this;
    }

    subVectors(a, b) {

        this._x = a.x - b.x;
        this._y = a.y - b.y;
        this._z = a.z - b.z;
        this.onChange();
        return this;
    }

    lengthSq() {

        return this.x * this.x + this.y * this.y + this.z * this.z;

    }

    multiplyScalar(scalar) {

        this._x *= scalar;
        this._y *= scalar;
        this._z *= scalar;
        this.onChange();
        return this;

    }

    divideScalar(scalar) {

        return this.multiplyScalar(1 / scalar);

    }

    crossVectors(a, b) {

        let ax = a.x, ay = a.y, az = a.z;
        let bx = b.x, by = b.y, bz = b.z;

        this._x = ay * bz - az * by;
        this._y = az * bx - ax * bz;
        this._z = ax * by - ay * bx;
        this.onChange();
        return this;

    }

    length() {

        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    }

    normalize() {

        return this.divideScalar(this.length() || 1);

    }

    clone() {

        return new this.constructor(this.x, this.y, this.z);

    }

    toArray ( array, offset ) {

        if ( array === undefined ) array = [];
        if ( offset === undefined ) offset = 0;

        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;
        array[ offset + 2 ] = this.z;

        return array;

    }

    onChange(){

    }
}
