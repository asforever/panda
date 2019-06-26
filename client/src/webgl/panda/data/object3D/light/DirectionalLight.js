import Light from "./Light"
import Vector3 from "../../math/vector/Vector3";
import Color from "../../math/vector/Color";

export default class DirectionalLight extends Light {
    constructor() {
        super();
        this.isDirectionalLight = true;
        this.specular = new Color(1, 1, 1);
        this.dir = new Vector3(0, -1, 0);
    }
}