export default class PointLightGL{
    constructor(){
        this.uniforms = {};
    }

    parse(pointLights) {
        let uniforms = {};
        pointLights.forEach((pointLight, key) => {
            const lightKey = "point_lights[" + key + "]";
            uniforms[lightKey + ".diffuse"] = pointLight.color.toArray3();
            uniforms[lightKey + ".specular"] = pointLight.specular.toArray3();
            uniforms[lightKey + ".position"] = pointLight.position.toArray();
            uniforms[lightKey + ".intensity"] = pointLight.intensity;
            uniforms[lightKey + ".constant"] = pointLight.constant;
            uniforms[lightKey + ".linear"] = pointLight.linear;
            uniforms[lightKey + ".quadratic"] = pointLight.quadratic;
        });
        this.uniforms = uniforms;
    }
}
