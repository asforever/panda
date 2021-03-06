import Webgl2Api from "../util/Webgl2Api";

export default class WebglState2 {
    constructor(canvas) {
        this._gl = Webgl2Api.createWebglContext(canvas);
        this.curProgram = null;
    }

    getContext() {
        return this._gl;
    }

    //texture
    createTexture2D({
                        image, internalFormat, width, height, format, type,levels
                        , ws, wt, minF, maxF
                    }) {
        const gl = this._gl;
        const textureBuffer = Webgl2Api.createTexture(gl, false, ws, wt, minF, maxF);
        Webgl2Api.updateTexture2D(gl, textureBuffer, image, internalFormat, width, height, format, type,levels);
        return textureBuffer;
    }

    createTextureCube({
                          imageArr, internalFormat, width, height, format, type,levels
                          , ws, wt, minF, maxF
                      }) {

        const gl = this._gl;
        const textureBuffer = Webgl2Api.createTexture(gl, true, ws, wt, minF, maxF);
        Webgl2Api.updateTextureCube(gl, textureBuffer, imageArr, internalFormat, width, height, format, type,levels);
        return textureBuffer;
    }

    setTexture2D(location, textureBuffer, uint = 0) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform1i(uniformLocation, uint);
        gl.activeTexture(gl.TEXTURE0 + uint);
        gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
    }

    setTextureCube(location, webglTexture, uint = 0) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform1i(uniformLocation, uint);
        gl.activeTexture(gl.TEXTURE0 + uint);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, webglTexture);
    }

    generateMipmap(target, textureBuffer) {
        const gl = this._gl;
        gl.bindTexture(target, textureBuffer);
        gl.generateMipmap(target, textureBuffer);
    }

    copyTexture({textureBuffer, target, texTarget,level = 0, internalFormat, x = 0, y = 0, width = 512, height = 512, border = 0}) {
        const gl = this._gl
            , resultInternalFormat = gl.RGBA;

        gl.bindTexture(target, textureBuffer);
        gl.copyTexImage2D(texTarget, level, resultInternalFormat, x, y, width, height, border);
    }

    //
    createProgramInfo(vsSource, fsSource) {
        const gl = this._gl;
        return Webgl2Api.createProgramInfo(gl, vsSource, fsSource);
    }

    createRenderTarget(width, height) {
        return Webgl2Api.createRenderTarget(this._gl, width, height);
    }

    createVaoFromGeometry(geometry) {
        const filterAttributes = [];
        const attributes = geometry.attributes;
        Object.keys(attributes).forEach((key, index) => {
            if ((1 << index) & geometry.attributesCode) filterAttributes.push(attributes[key]);
        });

        return Webgl2Api.createVaoAndBindAttributes(this._gl, filterAttributes, geometry.indices);
    }

    //config
    use(program) {
        this.curProgram = program;
        this._gl.useProgram(program);
    }

    setInt(location, num) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform1i(uniformLocation, num);
    }

    setFloat(location, floatNum) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform1f(uniformLocation, floatNum);
    }

    setVec3(location, x, y, z) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniform3fv(uniformLocation, [x, y, z]);
    }

    setMat4(location, mat4) {
        const gl = this._gl;
        const uniformLocation = gl.getUniformLocation(this.curProgram, location);
        gl.uniformMatrix4fv(uniformLocation, false, mat4);
    }

    setRenderTarget(renderTarget, texture) {
        Webgl2Api.bindRenderTargetTexture(this._gl, renderTarget, texture);
    }

    setCubeRenderTarget(renderTarget, texture, uint, mipLevel) {
        Webgl2Api.bindRenderTargetTextureCube(this._gl, renderTarget, texture, uint, mipLevel);
    }

    resizeRenderTarget(renderTarget, width, height) {
        Webgl2Api.resizeRenderTarget(this._gl, renderTarget, width, height)
    }

    setVao(vao) {
        this._gl.bindVertexArray(vao);
    }

    unBindRenderTarget() {
        const gl = this._gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    drawElements(vertexCount) {
        const gl = this._gl;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }


    viewport(x, y, width, height) {
        this._gl.viewport(x, y, width, height);
    }

    setClearColor(r, g, b, a) {
        this._gl.clearColor(r, g, b, a);
    }

    clear(clearCode) {
        this._gl.clear(clearCode);
    }

    clearBufferfv(clearCode) {
        this._gl.clearBufferfv(clearCode, 0, [0.3, 0.3, 0.3, 1.0]);
    }

    enableDepthTest(cap) {
        const gl = this._gl;
        gl.enable(cap);
        if (cap) gl.depthFunc(gl.LEQUAL);
    }
}
