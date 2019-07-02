export default class WebglRenderTarget {
    constructor(gl, width, height) {
        this.gl = gl;
        this.frameBuffer = null;
        this.renderBuffer = null;

        this.init(width, height);
    }

    init(width, height) {
        const gl = this.gl;
        const frameBuffer = this.frameBuffer = gl.createFramebuffer();
        const renderBuffer = this.renderBuffer = gl.createRenderbuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0);

        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderBuffer);
    }


}
