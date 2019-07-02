export default class Webgl2Api {
    static createWebglContext(canvas) {
        return canvas.getContext('webgl2');
    }

    static loaderShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    static createProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loaderShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loaderShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            gl.deleteProgram(shaderProgram);
            console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        Webgl2Api.deleteShader(gl, vertexShader);
        Webgl2Api.deleteShader(gl, fragmentShader);
        return shaderProgram;
    }

    static deleteShader(gl, shader) {
        gl.deleteShader(shader);
    }
}
