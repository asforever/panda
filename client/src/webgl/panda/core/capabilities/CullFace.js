import WebglConst from "../../const/WebglConst";

export default class CullFace {
    constructor(gl) {
        this._gl = gl;
        this.currentCullType = null;
        this.enableCullType = null;
    }

    setCullType(cullType) {
        if (this.currentCullType === cullType) return;
        let gl = this._gl;
        if (cullType === WebglConst.FRONT
            || cullType === WebglConst.BACK) {
            if(this.enableCullType !==true)gl.enable(gl.CULL_FACE);
            gl.cullFace(gl[cullType]);
            this.enableCullType = true;
        } else if(this.enableCullType !==false){
            gl.disable(gl.CULL_FACE);
            this.enableCullType = false
        }

        this.currentCullType = cullType
    }

    reset() {
        this.currentCullType = null;
    }
}
