export default class WebGLExtensions {
    static OES_VERTEX_ARRAY_OBJECT = "OES_vertex_array_object";

    constructor(gl) {
        this.gl = gl;
        this.extensions = {};
    }

    get(EXT_name) {
        return this.extensions[EXT_name] ? this.extensions[EXT_name] : this.gl.getExtension(EXT_name)
    }

}