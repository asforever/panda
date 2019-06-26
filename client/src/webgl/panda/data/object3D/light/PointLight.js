import Light from "./Light"
import Color from "../../math/vector/Color";

export default class PointLight extends Light {
    constructor() {
        super();
        this.isPointLight = true;
        this.constant = 1.0;
        this.linear = 0.09;
        this.quadratic = 0.032;
        this.specular = new Color(1, 1, 1);
    }
}