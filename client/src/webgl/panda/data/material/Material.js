import Color from "../math/vector/Color";
import WebglConst from "../../const/WebglConst"

export default class Material {


    constructor(config = {}) {
        this.type = null;
        //uniforms
        this.map = config.map;
        this.color = config.color || new Color();

        //cut face
        this.cullFace = config.cullFace!==undefined? config.cullFace:WebglConst.BACK;

        //depth test
        this.depthTest = true;
        this.depthFunc = WebglConst.LESS;
        this.depthMask = true;
        //stencil test
        this.stencilTest = false;
        this.stencilMask = 0xff;
        this.stencilFunc = WebglConst.ALWAYS;
        this.stencilFuncRef = 0;
        this.stencilFuncMask = 0xff;
        this.Fail = WebglConst.KEEP;
        this.ZFail = WebglConst.KEEP;
        this.ZPass = WebglConst.KEEP;
        //blend
        this.opacity = 1.0;
        this.transparent = false;
        this.blendSeprate = false;

        this.blendSrc = WebglConst.SRC_ALPHA;
        this.blendDst = WebglConst.ONE_MINUS_SRC_ALPHA;
        this.blendSrcAlpha = WebglConst.SRC_ALPHA;
        this.blendDstAlpha = WebglConst.ONE_MINUS_SRC_ALPHA;
        this.blendEquation =  WebglConst.FUNC_ADD;
    }
}
