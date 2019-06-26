export default class StencilBuffer {
    constructor(gl) {
        this._gl = gl;

        this.currentTest = null;
        this.currentMask = null;
        this.currentFunc = null;
        this.currentFuncRef = null;
        this.currentFuncMask = null;
        this.currentFail = null;
        this.currentZFail = null;
        this.currentZPass = null;
        this.currentClear = null;
    }

    setTest(stencilTest) {
        if (this.currentTest !== stencilTest) {
            const gl = this._gl;
            stencilTest ? gl.enable(gl.STENCIL_TEST) : gl.disable(gl.STENCIL_TEST);
            this.currentTest = stencilTest;
        }
    }

    setMask(stencilMask) {
        if (this.currentMask !== stencilMask) {
            this._gl.stencilMask(stencilMask);
            this.currentMask = stencilMask
        }
    }

    setFunc(stencilFunc, stencilRef, stencilMask) {
        if (this.currentFunc !== stencilFunc
            || this.currentFuncRef !== stencilRef
            || this.currentFuncMask !== stencilMask
        ) {
            const gl = this._gl;
            gl.stencilFunc(gl[stencilFunc], stencilRef, stencilMask);
            this.currentFunc = stencilFunc;
            this.currentFuncRef = stencilRef;
            this.currentFuncMask = stencilMask;
        }
    }

    setOp(stencilFail, stencilZFail, stencilZPass) {

        if (this.currentFail !== stencilFail ||
            this.currentZFail !== stencilZFail ||
            this.currentZPass !== stencilZPass) {
            const gl = this._gl;
            gl.stencilOp(gl[stencilFail], gl[stencilZFail], gl[stencilZPass]);
            this.currentFail = stencilFail;
            this.currentZFail = stencilZFail;
            this.currentZPass = stencilZPass;
        }
    }

    setClear(stencil) {
        if (this.currentClear !== stencil) {
            this._gl.clearStencil(stencil);
            this.currentClear = stencil;
        }
    }

    reset() {
        this.currentFunc = null;
    }
}