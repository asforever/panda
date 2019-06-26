import Light from "./Light"
import Color from "../../math/vector/Color";
import Vector3 from "../../math/vector/Vector3";

export default class SpotLight extends Light {
    constructor() {
        super();
        this.isSpotLight = true;
        this.dir = new Vector3(0, -1, 0);
        this.cutOff = Math.cos(Math.PI / 180 * 7.5);
        this.outerCutOff = Math.cos(Math.PI / 180 * 12);
        this.constant = 1.0;
        this.linear = 0.09;
        this.quadratic = 0.032;
        this.specular = new Color(1, 1, 1);
    }
}