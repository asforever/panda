import ColorBuffer from "./ColorBuffer";
import DepthBuffer from "./DepthBuffer";
import StencilBuffer from "./StencilBuffer";
import Blending from "./Blending";
import CullFace from "./CullFace";

export default class WebGLCapabilities {
    constructor(gl) {
        this.depthBuffer = new DepthBuffer(gl);
        this.stencilBuffer = new StencilBuffer(gl);
        this.colorBuffer = new ColorBuffer(gl);
        this.blending = new Blending(gl);
        this.CullFace = new CullFace(gl);

    }
}
