export default class PointLightCompiler{
    constructor(){
        this.uniforms = {};
    }

    parse(spotLights) {
        let uniforms = {};
        spotLights.forEach((spotLight, key) => {
            const lightKey = "spot_lights[" + key + "]";
            uniforms[lightKey + ".diffuse"] = spotLight.color.toArray3();
            uniforms[lightKey + ".specular"] = spotLight.specular.toArray3();

            uniforms[lightKey + ".position"] = spotLight.position.toArray();
            uniforms[lightKey + ".dir"] = spotLight.dir.toArray();
            uniforms[lightKey + ".cut_off"] = spotLight.cutOff;
            uniforms[lightKey + ".outer_cut_off"] = spotLight.outerCutOff;

            uniforms[lightKey + ".intensity"] = spotLight.intensity;
            uniforms[lightKey + ".constant"] = spotLight.constant;
            uniforms[lightKey + ".linear"] = spotLight.linear;
            uniforms[lightKey + ".quadratic"] = spotLight.quadratic;
        });
        this.uniforms = uniforms;
    }
}
