import Matrix4 from "../math/matrix/Matrix4";
import Vector3 from "../math/vector/Vector3";
import Euler from "../math/vector/Euler";
import Quaternion from "../math/vector/Quaternion";
import GMath from "../math/GMath";

export default class Object3D {
    constructor() {
        this.UUID = GMath.generateUUID();
        this.children = [];
        this.matrix = new Matrix4();
        this.position = new Vector3();
        this.rotation = new Euler();
        this.quaternion = new Quaternion();
        this.scale = new Vector3(1,1,1);

        this.initEvent();

    }

    initEvent(){
        this.position.onChange = ()=>{
            this.matrix.needsUpdate = true;
        };
        this.rotation.onChange = ()=>{
            this.matrix.needsUpdate = true;
        };
    }

    add(child) {
        this.children.push(child);
    }

    traverse(callback) {
        callback(this);
        const children = this.children;
        for (let i = 0, l = children.length; i < l; i++) {
            children[i].traverse(callback);
        }
    }

    updateMatrix() {
        this.quaternion.setFromEuler(this.rotation);
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrix.needsUpdate = true;
    }

    lookAt(target) {
        this.matrix.lookAt(this.position, target, new Vector3(0, 1, 0));
    }

    dispose() {

    }
}
