import Webgl2Api from "../util/Webgl2Api";

export default class WebglState {
    constructor(canvas) {
        this._gl = Webgl2Api.createWebglContext(canvas);
        this.curProgram = null;
    }

    getContext() {
        return this._gl;
    }

    createProgram(vsSource, fsSource) {
        const gl = this._gl;
        return Webgl2Api.createProgram(gl, vsSource, fsSource);
    }

    use(program) {
        this.curProgram = program;
        this._gl.useProgram(program);
    }

    setInt(location, num) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform1i(uniformLocation, num);
    }

    setVec3(location, x, y, z) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform3fv(uniformLocation, [x, y, z]);
    }

    setFloat(location, floatNum) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform1f(uniformLocation, floatNum);
    }


}
