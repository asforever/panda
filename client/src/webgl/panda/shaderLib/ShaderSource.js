export default class ShaderSource {
    constructor() {
        this.version = "#version 300 es\n";
        this.precision = "";
        this.defines = "";
        this.main = "";
    }

    setVersion(version) {
        this.version = "#version " + version + " es\n";
    }

    setPrecision(precision) {
        this.precision = "precision " + precision + " float;\n";
        return this;
    }

    addDefine(name, value = "") {
        this.defines += "#define " + name + value + ";\n";
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
            + this.defines
            + this.main;
    }
}
