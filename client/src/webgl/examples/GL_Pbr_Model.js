import {
    WebglState2,
    ShaderLib,
    CubeGeometry,
    QuadGeometry,
    ParseStateObject3DMediator,
    OBJLoader, Object3D
} from "../panda";

import FileLoader from "../panda/loader/FileLoader";
import * as glm from "gl-matrix";

export default class GL_Pbr_Model {
    constructor() {
        this.state = null;
        this.modelView = glm.mat4.create();
        this.opaqueMeshesInfo = [];
        this.transparentMeshesInfo = [];
        this.bookMeshInfo = {};
        this.pbrMap = null;
        this.captureRenderTarget = null;
        this.canvas = null;
        this.programs = {};
    }


    async setUp(canvas) {
        this.canvas = canvas;
        const lantern = await new OBJLoader().load("./assets/model/lantern/lantern_obj.obj");
        const hdrEnvMap = await new FileLoader().load("./assets/textures/hdr/skybox.png", undefined, FileLoader.IMAGE);

        const albedoMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Base_Color.jpg", undefined, FileLoader.IMAGE);
        const aoMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Mixed_AO.jpg", undefined, FileLoader.IMAGE);
        const normalMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Normal_OpenGL.jpg", undefined, FileLoader.IMAGE);
        const metallicMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Metallic.jpg", undefined, FileLoader.IMAGE);
        const roughnessMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Roughness.jpg", undefined, FileLoader.IMAGE);
        //data
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const captureProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, 1, 0.1, 10);
        const captureViews = [
            glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 1, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
            glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), -1, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
            glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0), glm.vec3.set(glm.vec3.create(), 0, 0, 1)),
            glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0), glm.vec3.set(glm.vec3.create(), 0, 0, -1)),
            glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 0, 1), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
            glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 0, -1), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
        ];

        const cameraProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 3, canvas.width / canvas.height, 0.1, 400);
        const cameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 80, 80, 80), glm.vec3.set(glm.vec3.create(), 0, 50, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0));
        const cameraPos = [80, 80, 80];

        const bookCamera = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, canvas.width / canvas.height, 0.1, 10);
        const bookCameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0.5), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0));

        const cubeGeometry = new CubeGeometry();
        const quadGeometry = new QuadGeometry();
        const bookGeometry = new QuadGeometry(canvas.width / canvas.height, 1);

        let modelObject3D = new ParseStateObject3DMediator().parse(new Object3D(), lantern);

        const pointLightPositions = [
            glm.vec3.set(glm.vec3.create(), 0, 0, 0),
            glm.vec3.set(glm.vec3.create(), -30, 30, 30),
            glm.vec3.set(glm.vec3.create(), 30, 30, 30),
            glm.vec3.set(glm.vec3.create(), -30, -30, 30),
            glm.vec3.set(glm.vec3.create(), 30, -30, 30),
        ];
        const pointLightColors = [
            glm.vec3.set(glm.vec3.create(), 20000, 2000, 0),
            glm.vec3.set(glm.vec3.create(), 300, 0, 300),
            glm.vec3.set(glm.vec3.create(), 300, 0, 300),
            glm.vec3.set(glm.vec3.create(), 300, 0, 300),
            glm.vec3.set(glm.vec3.create(), 300, 0, 300)
        ];

        //ctx
        const state = this.state = new WebglState2(canvas)
            , gl = state.getContext();

        gl.getExtension('EXT_color_buffer_float');
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        //buffer

        const cubeVAO = state.createVaoFromGeometry(cubeGeometry);
        const quadVAO = state.createVaoFromGeometry(quadGeometry);
        const bookVAO = state.createVaoFromGeometry(bookGeometry);

        modelObject3D.children.forEach((mesh, key) => {
            let meshInfo = {
                vao: state.createVaoFromGeometry(mesh.geometry),
                indexLen: mesh.geometry.attributes["position"].data.length / 3
            };

            if (mesh.name !== "glass lantern") {
                this.opaqueMeshesInfo.push(meshInfo);
            } else {
                this.transparentMeshesInfo.push(meshInfo);
            }

        });


        const captureRenderTarget = this.captureRenderTarget = state.createRenderTarget(512, 512);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        const albedoTexture = state.createTexture2D({
            image: albedoMap,
            width: 2048,
            height: 2048,
            internalFormat: gl.RGB,
            format: gl.RGB,
            type: gl.UNSIGNED_BYTE
        });
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        const aoTexture = state.createTexture2D({
            image: aoMap,
            width: 1,
            height: 1,
            internalFormat: gl.LUMINANCE,
            format: gl.LUMINANCE,
            type: gl.UNSIGNED_BYTE
        });
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        const normalTexture = state.createTexture2D({
            image: normalMap,
            internalFormat: gl.RGB,
            format: gl.RGB,
            type: gl.UNSIGNED_BYTE
        });
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        const metallicTexture = state.createTexture2D({
            image: metallicMap,
            width: 1,
            height: 1,
            internalFormat: gl.LUMINANCE,
            format: gl.LUMINANCE,
            type: gl.UNSIGNED_BYTE
        });
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        const roughnessTexture = state.createTexture2D({
            image: roughnessMap,
            width: 1,
            height: 1,
            internalFormat: gl.LUMINANCE,
            format: gl.LUMINANCE,
            type: gl.UNSIGNED_BYTE
        });

        const hdrMap = state.createTexture2D({
            image: hdrEnvMap,
            //width: hdrEnvMap.width,
            //height: hdrEnvMap.height,
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT
        });

        const envCubeMap = state.createTextureCube({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: 512, height: 512,
            minF: gl.LINEAR_MIPMAP_LINEAR,
        });

        const irradianceMap = state.createTextureCube({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: 32, height: 32
        });

        //prefilter map
        const prefilterMap = state.createTextureCube({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: 128, height: 128,
            minF: gl.LINEAR_MIPMAP_LINEAR,
            levels: 5
        });


        const brdfMap = state.createTexture2D({
            internalFormat: gl.RG16F,
            format: gl.RG,
            type: gl.FLOAT,
            width: 512, height: 512,
        });

        const pbrMap = this.pbrMap = state.createTexture2D({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: canvas.width, height: canvas.height,
        });


        //program
        const pbrSource = ShaderLib.pbr
            , brdfSource = ShaderLib.brdf
            // , backgroundSource = ShaderLib.background
            , prefilterSource = ShaderLib.prefilter
            , toDToCubeMapSource = ShaderLib.convert_2d_to_cubemap
            , irrSource = ShaderLib.irradiance_convolution
            , book = ShaderLib.book;

        const pbrProgramInfo = state.createProgramInfo(
            pbrSource.vs.getSource()
            , pbrSource.fs
                .addDefine("NORMAL_MAP")
                .addDefine("POINT_LIGHT_NUMBER", 5)
                .getSource()),
            brdfProgramInfo = state.createProgramInfo(brdfSource.vs.getSource(), brdfSource.fs.getSource()),
            // , backgroundProgramInfo = state.createProgramInfo(backgroundSource.vs.getSource(), backgroundSource.fs.getSource()),
            prefilterProgramInfo = state.createProgramInfo(prefilterSource.vs.getSource(), prefilterSource.fs.getSource()),
            toDToCubeMapProgramInfo = state.createProgramInfo(toDToCubeMapSource.vs.getSource(), toDToCubeMapSource.fs.getSource()),
            irrProgramInfo = state.createProgramInfo(irrSource.vs.getSource(), irrSource.fs.getSource()),
            bookProgramInfo = state.createProgramInfo(book.vs.getSource(), book.fs.getSource());

        //state
        state.enableDepthTest(gl.DEPTH_TEST);
        state.setClearColor(0.0, 0.0, 0.0, 1.0);

        //convert 2d to cube texture
        state.viewport(0, 0, 512, 512);
        state.use(toDToCubeMapProgramInfo.program);
        state.setMat4("projection", captureProjection);
        state.setTexture2D("equirectangularMap", hdrMap, 0);

        state.setVao(cubeVAO);
        for (let i = 0; i < 6; ++i) {
            state.setCubeRenderTarget(captureRenderTarget, envCubeMap, i);
            state.setMat4("view", captureViews[i]);
            state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            state.drawElements(36);
        }
        state.generateMipmap(gl.TEXTURE_CUBE_MAP, envCubeMap);
        state.unBindRenderTarget();

        //irradiance map
        state.use(irrProgramInfo.program);
        state.viewport(0, 0, 32, 32);
        state.setMat4("projection", captureProjection);
        state.setTextureCube("environmentMap", envCubeMap, 0, true);
        state.setVao(cubeVAO);
        state.resizeRenderTarget(captureRenderTarget, 32, 32);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (let i = 0; i < 6; ++i) {
            state.setMat4("view", captureViews[i]);
            state.setCubeRenderTarget(captureRenderTarget, irradianceMap, i);
            state.drawElements(36);
        }
        state.unBindRenderTarget();
        //prefilter map
        state.use(prefilterProgramInfo.program);
        state.setMat4("projection", captureProjection);
        state.setVao(cubeVAO);

        let maxMipLevels = 5;
        for (let mip = 0; mip < maxMipLevels; ++mip) {
            const mipWidth = 128 * Math.pow(0.5, mip);
            const mipHeight = 128 * Math.pow(0.5, mip);
            let roughness = mip / (maxMipLevels - 1);
            state.viewport(0, 0, mipWidth, mipHeight);
            state.resizeRenderTarget(captureRenderTarget, mipWidth, mipHeight);
            state.setFloat("roughness", roughness);

            for (let i = 0; i < 6; ++i) {
                state.setMat4("view", captureViews[i]);
                state.setTextureCube("environmentMap", envCubeMap, 0, true);
                state.setCubeRenderTarget(captureRenderTarget, prefilterMap, i, mip);
                state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                state.drawElements(36);
            }
        }
        state.unBindRenderTarget();

        //BRDF
        gl.cullFace(gl.BACK);
        state.use(brdfProgramInfo.program);
        state.viewport(0, 0, 512, 512);
        state.setVao(quadVAO);
        state.resizeRenderTarget(captureRenderTarget, 512, 512);
        state.setRenderTarget(captureRenderTarget, brdfMap);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        state.drawElements(quadGeometry.indices.data.length);
        state.unBindRenderTarget();

        gl.disable(gl.CULL_FACE);
        //pbr
        state.use(pbrProgramInfo.program);
        state.viewport(0, 0, canvas.width, canvas.height);


        state.setMat4("projection", cameraProjection);
        state.setMat4("view", cameraView);
        state.setVec3("camPos", ...cameraPos);
        state.setFloat("opacity", 1);
        state.setTextureCube("irradianceMap", irradianceMap, 0);
        state.setTextureCube("prefilterMap", prefilterMap, 1);
        state.setTexture2D("brdfLUT", brdfMap, 2);
        state.setTexture2D("albedoMap", albedoTexture, 3);
        state.setTexture2D("normalMap", normalTexture, 4);
        state.setTexture2D("aoMap", aoTexture, 5);
        state.setTexture2D("metallicMap", metallicTexture, 6);
        state.setTexture2D("roughnessMap", roughnessTexture, 7);
        state.setMat4("model", glm.mat4.create());
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (let i = 0; i < pointLightPositions.length; ++i) {
            state.setVec3("pointLightPositions[" + i + "]", ...pointLightPositions[i]);
            state.setVec3("pointLightColors[" + i + "]", ...pointLightColors[i]);
        }

        //state.use(backgroundProgramInfo.program);
        //state.setMat4("view", cameraView);
        //state.setMat4("projection", cameraProjection);
        //state.setTextureCube("environmentMap", envCubeMap, 0);
        //state.setVao(cubeVAO);
        //state.drawElements(cubeGeometry.indices.data.length);
//
        state.viewport(0, 0, canvas.width, canvas.height);
        state.use(bookProgramInfo.program);

        state.setMat4("view", bookCameraView);
        state.setMat4("projection", bookCamera);
        state.setMat4("model", glm.mat4.create());
        state.setFloat("ratio", bookGeometry.width / bookGeometry.height);
        state.setFloat("iTime", new Date().getTime());
        state.setFloat("width", bookGeometry.width);
        state.setFloat("height", bookGeometry.height);
        state.setTexture2D("iChannel0", hdrMap, 0);
        state.setTexture2D("iChannel1", pbrMap, 1);
        state.setFloat("ratio", bookGeometry.width / bookGeometry.height);
        state.setVec2("mouse", 0.001, 0.001);
        this.bookMeshInfo = {
            vao: bookVAO,
            indexLen: bookGeometry.indices.data.length
        };

        //program
        this.programs = {
            pbr: pbrProgramInfo.program,
            book: bookProgramInfo.program,
        };


        //animate
        window.addEventListener("mousemove", (e) => {
            state.setVec2("mouse", Math.max(e.clientX * bookGeometry.width / window.innerWidth,0.001), (1 - e.clientY / window.innerHeight) * bookGeometry.height);
        });
        this.animate();
    };

    animate() {
        let state = this.state;
        let gl = state.getContext();
        if (!this.canvas) return;

        //draw pbr model
        state.use(this.programs.pbr);
        state.resizeRenderTarget(this.captureRenderTarget, this.canvas.width, this.canvas.height);
        state.setRenderTarget(this.captureRenderTarget, this.pbrMap);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        glm.mat4.rotate( this.modelView,  this.modelView, Math.PI / 180, [0, 1, 0]);
        state.setMat4("model",  this.modelView);
        this.opaqueMeshesInfo.forEach((meshInfo) => {
            gl.disable(gl.BLEND);
            state.setVao(meshInfo.vao);
            state.setFloat("opacity", 1.0);
            state.drawArray(meshInfo.indexLen);
        });
        this.transparentMeshesInfo.forEach((meshInfo) => {
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

            gl.cullFace(gl.FRONT);

            state.setVao(meshInfo.vao);
            state.setFloat("opacity", 0.8);
            state.drawArray(meshInfo.indexLen);
        });

        state.unBindRenderTarget();

        //draw pbr book
        state.use(this.programs.book);
        state.setVao(this.bookMeshInfo.vao);
        state.drawElements(this.bookMeshInfo.indexLen);

        requestAnimationFrame(this.animate.bind(this));
    }

}

