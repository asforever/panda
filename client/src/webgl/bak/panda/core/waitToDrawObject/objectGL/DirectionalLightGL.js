export default class DirectionalLightGL {
    constructor(){
        this.uniforms = {};
    }

    parse(dirLights) {
        let uniforms = {};
        dirLights.forEach((dirLight, key) => {
            const intensity = dirLight.intensity;
            const lightKey = "dir_lights[" + key + "]";
            uniforms[lightKey + ".diffuse"] = dirLight.color.toArray3();
            uniforms[lightKey + ".specular"] = dirLight.specular.toArray3();
            uniforms[lightKey + ".dir"] = dirLight.dir.toArray();
            uniforms[lightKey + ".intensity"] = intensity;
        });
        this.uniforms = uniforms;
    }
}
