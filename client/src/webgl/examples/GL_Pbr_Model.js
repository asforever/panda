import {
    WebglState2,
    ShaderLib,
    Geometry,
    CubeGeometry,
    QuadGeometry,
    SphereGeometry,
    OBJLoader
} from "../panda";

import FileLoader from "../panda/util/loader/FileLoader";
import * as glm from "gl-matrix";
import BufferAttribute from "../panda/geometry/BufferAttribute";
import ShaderChuck from "../panda/shaderLib/shaderChuck/ShaderChuck";
import ShaderSource from "../panda/shaderLib/ShaderSource";

export default class GL_Pbr_Model {
    constructor() {
        this.state = null;
        this.modelView = glm.mat4.create();
        this.geomeries = [];
    }

    async setUp(canvas) {
        let shaderChuck = new ShaderChuck();
        shaderChuck.setVersion(300);
        shaderChuck.addAttributeIn("vec3","aPos");
        shaderChuck.addAttributeIn("vec2","aTexCoords");
        shaderChuck.addAttributeIn("vec3","aNormal");

        const lantern = await new OBJLoader().load("./assets/model/lantern/lantern_obj.obj");
        console.log(lantern);

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
        const cameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 100, 100, 100), glm.vec3.set(glm.vec3.create(), 0, 50, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0));
        const cameraPos = [100, 100, 100];

        const cubeGeometry = new CubeGeometry();
        const quadGeometry = new QuadGeometry();
        const sphereGeometry = new SphereGeometry(5, 64, 64);
        const modelGeometries = [];

        lantern.objects.forEach((object => {
            let geometry = object.geometry;
            if (geometry.vertices.length === 0) return;

            let modelGeometry = new Geometry();
            modelGeometry.addAttribute("position", new BufferAttribute({
                name: "position",
                data: new Float32Array(geometry.vertices),
                componentNum: 3
            }), 3);
            modelGeometry.addAttribute("uv", new BufferAttribute({
                name: "uv",
                data: new Float32Array(geometry.uvs),
                componentNum: 2
            }), 3);
            modelGeometry.addAttribute("normal", new BufferAttribute({
                name: "normal",
                data: new Float32Array(geometry.normals),
                componentNum: 3
            }), 3);
            modelGeometries.push(modelGeometry);
        }));


        const lightPositions = [
            glm.vec3.set(glm.vec3.create(), 0, 0, 30),
            glm.vec3.set(glm.vec3.create(), 30, 30, 30),
            glm.vec3.set(glm.vec3.create(), -30, -30, 30),
            glm.vec3.set(glm.vec3.create(), 30, -30, 30),
        ];
        const lightColors = [
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
        const sphereVAO = state.createVaoFromGeometry(sphereGeometry);
        const modelVAOs = [];
        modelGeometries.forEach(modelGeometry => {
            modelVAOs.push(state.createVaoFromGeometry(modelGeometry));
        });


        const captureRenderTarget = state.createRenderTarget(512, 512);

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


        //program
        const pbrSource = new ShaderSource().addDefine()
            , brdfSource = ShaderLib.brdf
            , backgroundSource = ShaderLib.background
            , prefilterSource = ShaderLib.prefilter
            , toDToCubeMapSource = ShaderLib.convert_2d_to_cubemap
            , irrSource = ShaderLib.irradiance_convolution;

        const pbrProgramInfo = state.createProgramInfo(pbrSource.vs, pbrSource.fs)
            , brdfProgramInfo = state.createProgramInfo(brdfSource.vs, brdfSource.fs)
            , backgroundProgramInfo = state.createProgramInfo(backgroundSource.vs, backgroundSource.fs)
            , prefilterProgramInfo = state.createProgramInfo(prefilterSource.vs, prefilterSource.fs)
            , toDToCubeMapProgramInfo = state.createProgramInfo(toDToCubeMapSource.vs, toDToCubeMapSource.fs)
            , irrProgramInfo = state.createProgramInfo(irrSource.vs, irrSource.fs);

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
        modelVAOs.forEach((modelVAO, key) => this.geomeries.push({vao: modelVAO, geo: modelGeometries[key]}));
        for (let i = 0; i < lightPositions.length; ++i) {
            state.setVec3("lightPositions[" + i + "]", ...lightPositions[i]);
            state.setVec3("lightColors[" + i + "]", ...lightColors[i]);
        }

        //state.use(backgroundProgramInfo.program);
        //state.setMat4("view", cameraView);
        //state.setMat4("projection", cameraProjection);
        //state.setTextureCube("environmentMap", envCubeMap, 0);
        //state.setVao(cubeVAO);
        //state.drawElements(cubeGeometry.indices.data.length);
//
        this.animate();
    };

    animate() {
        let state = this.state;
        let gl = state.getContext();
        let modelView = this.modelView;
        glm.mat4.rotate(modelView, modelView, Math.PI / 180, [0, 1, 0]);
        state.setMat4("model", modelView);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.geomeries.forEach((geometry) => {
            state.setVao(geometry.vao);
            state.drawArray(geometry.geo.attributes["position"].data.length / 3);
        });

        requestAnimationFrame(this.animate.bind(this))
    }

}

