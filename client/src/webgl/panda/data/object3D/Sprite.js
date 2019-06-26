import Object3D from "./Object3D";

export default class Sprite extends Object3D{
    constructor(material){
        super();
        this.material = material;
    }
}