import Light from "./Light"

export default class AmbientLight extends Light {
    constructor() {
        super();
        this.isAmbientLight = true;
        this.intensity = 0.2;
    }
}
