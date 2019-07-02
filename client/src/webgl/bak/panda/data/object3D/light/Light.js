import Object3D from "../Object3D"
import Color from "../../math/vector/Color";

export default class Light extends Object3D {
    constructor() {
        super();
        this.needsUpdate = true;
        this.isLight = true;
        this.color = new Color(1, 1, 1);
        this.intensity = 1;
    }
}