export default class ShaderSource {
    constructor() {
        this.version = "#version 300 es\n";
        this.precision = "";
        this.main = "";
        this.define = "";

        this.defineMap = {};
    }

    setVersion(version) {
        this.version = "#version " + version + " es\n";
    }

    setPrecision(precision) {
        this.precision = "precision " + precision + " float;\n";
        return this;
    }

    addDefine(name, value = "") {
        let defineMap = this.defineMap;

        if (defineMap[name] === value) return this;

        this.define = "";
        defineMap[name] = value;
        for (let defineMapKey in defineMap) {
            this.define += "#define " + defineMapKey + " " + defineMap[defineMapKey] + "\n";
        }

        return this;
    }

    addMain(shaderChuck) {
        shaderChuck = shaderChuck.replace("#define GLSLIFY 1", "");
        this.main = "\n" + shaderChuck;
        return this;
    }

    getSource() {
        return this.version
            + this.precision
            + this.define
            + this.main;
    }
}
