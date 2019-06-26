export default class DepthBuffer {
    constructor(gl) {
        this._gl = gl;

        this.currentTest = null;
        this.currentMask = null;
        this.currentFunc = null;
        this.currentClear = null;
    }

    setTest(depthTest) {
        if (this.currentTest !== depthTest) {
            const gl = this._gl;
            depthTest ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
            this.currentTest = depthTest;
        }
    }

    setMask(depthMask) {
        if (this.currentMask !== depthMask) {
            this._gl.depthMask(depthMask);
            this.currentMask = depthMask
        }
    }

    setFunc(depthFunc) {
        if (this.currentFunc !== depthFunc) {
            const gl = this._gl;
            gl.depthFunc(gl[depthFunc]);
            this.currentFunc = depthFunc;
        }
    }

    setClear(depth) {
        if (this.currentClear !== depth) {
            this._gl.clearDepth(depth);
            this.currentClear = depth;
        }
    }

    reset() {
        this.currentFunc = null;
    }
}