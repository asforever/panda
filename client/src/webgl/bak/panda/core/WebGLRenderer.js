import ObjectGLCreator from "./waitToDrawObject/ObjectGLCreator";

export default class WebGLRenderer {
    constructor(state, cache) {
        this.state = state;
        this.cache = cache;
        this.autoClear = true;
        this.curRenderTarget = null;
        this.meshes = [];
        this.ambientLights = [];
        this.dirLights = [];
        this.spotLights = [];
        this.pointLights = [];

    }

    //render
    sortScene(scene) {
        this.dirLights = [];
        this.ambientLights = [];
        this.pointLights = [];
        this.spotLights = [];
        this.meshes = [];

        scene.traverse(children => {
            if (children.isDirectionalLight) this.dirLights.push(children);
            if (children.isAmbientLight) this.ambientLights.push(children);
            if (children.isPointLight) this.pointLights.push(children);
            if (children.isSpotLight) this.spotLights.push(children);
            if (children.isMesh) this.meshes.push(children)
        });
    }

    render(scene, camera, renderTarget) {
        const state = this.state, cache = this.cache

        this.sortScene(scene);

        let renderTargetGL = ObjectGLCreator.createRenderTargetGL();
        let shaderStoreGL = ObjectGLCreator.createShaderStoreGL();
        let cameraGL = ObjectGLCreator.createCameraGL();
        let ambientLightGL = ObjectGLCreator.createAmbientLightGL();
        let directionalGL = ObjectGLCreator.createDirectionalLightGL();
        let spotLightGL = ObjectGLCreator.createSpotLightGL();
        let pointLightGL = ObjectGLCreator.createPointLightGL();

        shaderStoreGL.parseLight({
            dirLightNum: this.dirLights.length
            , ambientLightNum: this.ambientLights.length
            , pointLightNum: this.pointLights.length
            , spotLightNum: this.spotLights.length
        });
        renderTargetGL.parse(state, cache, renderTarget);
        cameraGL.parse(camera);
        directionalGL.parse(this.dirLights);
        ambientLightGL.parse(this.ambientLights);
        pointLightGL.parse(this.pointLights);
        spotLightGL.parse(this.spotLights);

        let opaqueObjects = [], transparentObject = [];
        this.meshes.forEach(mesh => {
            let meshGL = ObjectGLCreator.createMeshGL();
            let materialGL = ObjectGLCreator.createMaterialGL();
            let geometryGL = ObjectGLCreator.createGeometryGL();

            meshGL.parse(cache,mesh);
            materialGL.parse(state,cache,mesh.material,shaderStoreGL);
            geometryGL.parse(state,cache,mesh.geometry,mesh.material.type);

            let waitToDrawObject = ObjectGLCreator.createWaitToDrawObject();
            waitToDrawObject.setUp({
                programInfo:materialGL.programInfo
                ,uniforms:{}
                ,attributes:geometryGL.attributes
                ,indices:geometryGL.indices
                ,drawSize:geometryGL.drawSize
                ,VAO:geometryGL.VAO
                ,needsUpdateVAO:geometryGL.needsUpdateVAO
                ,capabilities:materialGL.capabilities
            });
            waitToDrawObject.mergeUniforms(
                meshGL.uniforms
                , materialGL.uniforms
                , cameraGL.uniforms
                , directionalGL.uniforms
                , ambientLightGL.uniforms
                , pointLightGL.uniforms
                , spotLightGL.uniforms);


            if (waitToDrawObject.needSort()) {
                waitToDrawObject.reCalcDepth();
                transparentObject.push(waitToDrawObject);
            } else {
                opaqueObjects.push(waitToDrawObject);
            }
        });
        transparentObject.sort((l, c) => c.depth - l.depth);
        let waitToDrawObjects = opaqueObjects.concat(transparentObject);

        //draw
        if (this.curRenderTarget !== renderTarget) {
            this.curRenderTarget = renderTarget;
            state.bindFrameBuffer( renderTargetGL.fbo);
        }
        if (this.autoClear) this.clear();

        //draw
        waitToDrawObjects.forEach((objectToDraw) => {
            const programInfo = objectToDraw.programInfo
                , program = programInfo.program
                , uniforms = objectToDraw.uniforms
                , attributes = objectToDraw.attributes
                , indices = objectToDraw.indices
                , drawSize = objectToDraw.drawSize
                , VAO = objectToDraw.VAO
                , needsUpdateVAO = objectToDraw.needsUpdateVAO
                , capabilities = objectToDraw.capabilities
                , isDepthTest = capabilities.depthTest
                , isStencilTest = capabilities.stencilTest
                , isTransparent = capabilities.transparent
                , isCullFace = capabilities.cullFace;

            state.useProgram(program);
            state.setUniforms(programInfo, uniforms);
            needsUpdateVAO ? state.bindVAOAndSetAttributes(programInfo, attributes, indices, VAO) : state.bindVAO(VAO);

            //capabilities
            const depthBuffer = state.capabilities.depthBuffer
                , stencilBuffer = state.capabilities.stencilBuffer
                , blending = state.capabilities.blending
                , cullFace = state.capabilities.CullFace;

            depthBuffer.setTest(isDepthTest);
            stencilBuffer.setTest(isStencilTest);
            blending.setBlend(isTransparent);
            cullFace.setCullType(isCullFace);
            if (isDepthTest) {
                depthBuffer.setMask(capabilities.depthMask);
                depthBuffer.setFunc(capabilities.depthFunc);
            }
            if (isStencilTest) {
                stencilBuffer.setMask(capabilities.stencilMask);
                stencilBuffer.setFunc(capabilities.stencilFunc, capabilities.stencilFuncRef, capabilities.stencilFuncMask);
                stencilBuffer.setOp(capabilities.Fail, capabilities.ZFail, capabilities.ZPass);
            }
            if (isTransparent) {
                capabilities.blendSeprate
                    ? blending.setBlendFuncSeparate(capabilities.blendSrc, capabilities.blendDst, capabilities.blendSrcAlpha, capabilities.blendDstAlpha)
                    : blending.setBlendFunc(capabilities.blendSrc, capabilities.blendDst);
                if (capabilities.blendEquation) blending.setBlendEquation(capabilities.blendEquation);
            }
            state.drawElements(drawSize);
        });
        state.bindVAO(null);
    }

    //clear
    setClearColor(r, b, g, a) {
        this.state.setClearColor(r, b, g, a);
    }

    setClearDepth(depth) {
        this.state.setClearDepth(depth);
    }

    setClearStencil(stencil) {
        this.state.setClearStencil(stencil);
    }

    clear() {
        this.state.clear();
    }

    //
    getState() {
        return this.state;
    }

    dispose() {
        this.state.disposeContext();
    }

    viewport(left, top, width, height) {
        this.state.viewport(left, top, width, height);
    }

}
