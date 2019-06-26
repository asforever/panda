export default class Blending {
    constructor(gl) {
        this._gl = gl;

        this.currentBlend = null;
        this.blendEquation = null;
        this.blendSrc = null;
        this.blendDst = null;
        this.srcAlpha = null;
        this.dstAlpha = null;

    }

    setBlend(needBlend) {
        if (this.currentBlend !== needBlend) {
            const gl = this._gl;
            needBlend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
            this.currentBlend = needBlend;
        }
    }

    setBlendFunc(blendSrc, blendDst){
        if(this.blendSrc!==blendSrc||this.blendDst!==blendDst){
            let gl = this._gl;
            gl.blendFunc(gl[blendSrc], gl[blendDst]);
            this.blendSrc=blendSrc;
            this.blendDst=blendDst;
        }
    }
    setBlendFuncSeparate(blendSrc, blendDst, srcAlpha, dstAlpha){
        if(this.blendSrc!==blendSrc||this.blendDst!==blendDst
        ||this.srcAlpha!==srcAlpha||this.dstAlpha!==dstAlpha
        ){
            let gl = this._gl;
            gl.blendFuncSeparate(gl[blendSrc], gl[blendDst], gl[srcAlpha], gl[dstAlpha]);
            this.blendSrc=blendSrc;
            this.blendDst=blendDst;
            this.srcAlpha=srcAlpha;
            this.dstAlpha=dstAlpha;
        }
    }
    setBlendEquation(mode){
        if(this.blendEquation!==mode){
            this._gl.blendEquation(this._gl[mode]);
            this.blendEquation=mode
        }

    }

    reset() {
        this.currentBlend = null;
    }
}
