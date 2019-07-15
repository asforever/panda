import {
    WebglState,
    ShaderLib,
    CubeGeometry,
    QuadGeometry,
    SphereGeometry
} from "../panda";

import FileLoader from "../../util/FileLoader";
//import HDRLoader from "../../util/HDRLoader";

import * as glm from "gl-matrix";

export default class GL_Pbr {

    async setUp(canvas) {
        // const hdrEnvMap = await new HDRLoader().load("./assets/textures/hdr/newport_loft.hdr");
        const hdrEnvMap = await new FileLoader().load("./assets/textures/hdr/skybox.png", undefined, FileLoader.IMAGE);
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

        const cameraProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, canvas.width / canvas.height, 0.1, 100);
        const cameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 70), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0));
        const cameraPos = [0, 0, 70];


        const cubeGeometry = new CubeGeometry();
        const quadGeometry = new QuadGeometry();
        const sphereGeometry = new SphereGeometry(5);

        const lightPositions = [
            glm.vec3.set(glm.vec3.create(), 0, 0, 30),
            glm.vec3.set(glm.vec3.create(), 30, 30, 30),
            glm.vec3.set(glm.vec3.create(), -30, -30, 30),
            glm.vec3.set(glm.vec3.create(), 30, -30, 30),
        ];
        const lightColors = [
            glm.vec3.set(glm.vec3.create(), 300, 300, 300),
            glm.vec3.set(glm.vec3.create(), 300, 300, 300),
            glm.vec3.set(glm.vec3.create(), 300, 300, 300),
            glm.vec3.set(glm.vec3.create(), 300, 300, 300)
        ];

        //ctx
        const state = new WebglState(canvas)
            , gl = state.getContext();
        gl.getExtension('EXT_color_buffer_float');
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        //buffer

        const cubeVAO = state.createVaoFromGeometry(cubeGeometry);
        const quadVAO = state.createVaoFromGeometry(quadGeometry);
        const sphereVAO = state.createVaoFromGeometry(sphereGeometry);


        const captureRenderTarget = state.createRenderTarget(512, 512);

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
        const prefilterMap = state.createTextureCube({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: 128, height: 128,
            minF: gl.LINEAR_MIPMAP_LINEAR,
        });

        const brdfMap = state.createTexture2D({
            internalFormat: gl.RG16F,
            format: gl.RG,
            type: gl.FLOAT,
            width: 512, height: 512,
        });


        //program
        const pbrSource = ShaderLib.pbr
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
        state.setTextureCube("environmentMap", envCubeMap, 0, true);
        state.setVao(cubeVAO);

        let maxMipLevels = 5;
        for (let mip = 0; mip < maxMipLevels; ++mip) {
            const mipWidth = 128;
            const mipHeight = 128;
            let roughness = mip / (maxMipLevels - 1);
            state.viewport(0, 0, mipWidth, mipHeight);
            state.resizeRenderTarget(captureRenderTarget, mipWidth, mipHeight);
            state.setFloat("roughness", roughness);

            for (let i = 0; i < 6; ++i) {
                state.setMat4("view", captureViews[i]);
                state.setCubeRenderTarget(captureRenderTarget, prefilterMap, i);
                state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                state.drawElements(36);
            }
        }
        state.generateMipmap(gl.TEXTURE_CUBE_MAP, prefilterMap);
        state.unBindRenderTarget();

        state.use(brdfProgramInfo.program);
        state.viewport(0, 0, 512, 512);
        state.setVao(quadVAO);
        state.resizeRenderTarget(captureRenderTarget, 512, 512);
        state.setRenderTarget(captureRenderTarget, brdfMap);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        state.drawElements(6);
        state.unBindRenderTarget();

        //pbr
        state.use(pbrProgramInfo.program);
        state.viewport(0, 0, canvas.width, canvas.height);
        state.setVao(sphereVAO);

        state.setMat4("projection", cameraProjection);
        state.setMat4("view", cameraView);
        state.setVec3("camPos", ...cameraPos);
        state.setTextureCube("irradianceMap", irradianceMap, 0);
        state.setTextureCube("prefilterMap", prefilterMap, 1);
        state.setTexture2D("brdfLUT", brdfMap, 2);
        state.setVec3("albedo", 0.1, 0.0, 0.0);
        state.setFloat("ao", 1.0);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const rowLen = 6;
        const colLen = 6;
        const space = sphereGeometry.radius * 1;
        let model = glm.mat4.create();
        glm.mat4.translate(model, model, glm.vec3.set(glm.vec3.create(), -space * (rowLen - 1) / 2, -space * (colLen - 1) / 2, 0));
        let offsetH = glm.vec3.set(glm.vec3.create(), space, 0, 0);
        let offsetV = glm.vec3.set(glm.vec3.create(), 0, space, 0);

        for (let i = 0; i < lightPositions.length; ++i) {
            state.setVec3("lightPositions[" + i + "]", ...lightPositions[i]);
            state.setVec3("lightColors[" + i + "]", ...lightColors[i]);
        }

        for (let row = 0; row < rowLen; row++) {
            state.setFloat("metallic", row / rowLen/2+0.15);
            let curModelPos = glm.vec3.scale(glm.vec3.create(), offsetH, row);
            for (let col = 0; col < colLen; col++) {
                state.setFloat("roughness", col / colLen/2+0.15);
                let resultModelPos = glm.vec3.add(glm.vec3.create(), curModelPos, glm.vec3.scale(glm.vec3.create(), offsetV, col));
                let resultModelView = glm.mat4.translate(glm.mat4.create(), model, resultModelPos);
                state.setMat4("model", resultModelView);
                state.drawElements(sphereGeometry.indices.data.length);
            }
        }
        state.use(backgroundProgramInfo.program);
        state.setMat4("view", cameraView);
        state.setMat4("projection", cameraProjection);
        state.setTextureCube("environmentMap", envCubeMap, 0);
        state.setVao(cubeVAO);
        state.drawElements(cubeGeometry.indices.data.length);
    };

}

