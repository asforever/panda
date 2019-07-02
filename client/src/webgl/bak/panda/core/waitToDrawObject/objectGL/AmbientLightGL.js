export default class AmbientLightGL{
    constructor(){
        this.uniforms = {};
    }

    parse(ambientLights) {
        let uniforms = {};
        ambientLights.forEach((ambientLight, key) => {
            const lightKey = "ambient_lights[" + key + "]";
            uniforms[lightKey + ".ambient"] = ambientLight.color.toArray3();
            uniforms[lightKey + ".intensity"] = ambientLight.intensity;
        });
        this.uniforms = uniforms;
    }
}
