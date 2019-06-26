export default class WebGLExtensions {
    static OES_VERTEX_ARRAY_OBJECT = "OES_vertex_array_object";
    static EXT_SHADER_TEXTURE_LOD = "EXT_shader_texture_lod";
    static OES_STANDARD_DERIVATIVES = "OES_standard_derivatives";

    constructor(gl) {
        this.gl = gl;
        this.extensions = {};
    }

    get(EXT_name) {
        return this.extensions[EXT_name] ? this.extensions[EXT_name] : this.gl.getExtension(EXT_name)
    }

}