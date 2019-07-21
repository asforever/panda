export default class ShaderSource {
    constructor() {
        this.version = "#version 300 es\n";
        this.precision = "precision mediump  float;";
        this.defines = "";
        this.main = "";
    }

    setVersion(version) {
        this.version = "#version " + version + " es\n";
    }

    setPrecision(precision) {
        this.precision = "precision " + precision + " float\n";
    }

    addDefine(name, value) {
        this.defines += "#define " + name + value + "\n";
    }

    addMain(shaderChuck) {
        this.main += shaderChuck;
    }

    getSource() {
        return this.version
            + this.precision
            + this.defines
            + this.main;
    }
}