import {
    WebglState2,
    ShaderLib,
    CubeGeometry,
    QuadGeometry,
    SphereGeometry
} from "../panda";

import FileLoader from "../panda/loader/FileLoader";
//import HDRLoader from "../../util/HDRLoader";

import * as glm from "gl-matrix";

export default class GL_Pbr {

    async run(canvas) {
        const hdrEnvMap = await new FileLoader().load("./assets/textures/hdr/skybox.png", undefined, FileLoader.IMAGE);
        const albedoMap = new Uint8Array([255, 255, 255, 255]);//await new FileLoader().load("./assets/textures/pbr/rusted_iron/albedo.png", undefined, FileLoader.IMAGE);
        const aoMap = new Uint8Array([255]);// await new FileLoader().load("./assets/textures/pbr/rusted_iron/ao.png", undefined, FileLoader.IMAGE);
        const normalMap = await new FileLoader().load("./assets/textures/pbr/rusted_iron/normal.png", undefined, FileLoader.IMAGE);
        const metallicMap = new Uint8Array([255]);//await new FileLoader().load("./assets/textures/pbr/rusted_iron/metallic.png", undefined, FileLoader.IMAGE);
        const roughnessMap = new Uint8Array([255]);//await new FileLoader().load("./assets/textures/pbr/rusted_iron/roughness.png", undefined, FileLoader.IMAGE);
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

        const cameraProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 3, canvas.width / canvas.height, 0.1, 100);
        const cameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 30, 0, 70), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0));
        const cameraPos = [30, 0, 70];

        const cubeGeometry = new CubeGeometry();
        const quadGeometry = new QuadGeometry();
        const sphereGeometry = new SphereGeometry(5, 64, 64);

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
        const state = new WebglState2(canvas)
            , gl = state.getContext();
        gl.getExtension('EXT_color_buffer_float');
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        //buffer

        const cubeVAO = state.createVaoFromGeometry(cubeGeometry);
        const quadVAO = state.createVaoFromGeometry(quadGeometry);
        const sphereVAO = state.createVaoFromGeometry(sphereGeometry);


        const captureRenderTarget = state.createRenderTarget(512, 512);

        const albedoTexture = state.createTexture2D({
            image: albedoMap,
            width: 1,
            height: 1,
            internalFormat: gl.RGBA,
            format: gl.RGBA,
            type: gl.UNSIGNED_BYTE
        });

        const aoTexture = state.createTexture2D({
            image: aoMap,
            width: 1,
            height: 1,
            internalFormat: gl.LUMINANCE,
            format: gl.LUMINANCE,
            type: gl.UNSIGNED_BYTE
        });
        const normalTexture = state.createTexture2D({
            image: normalMap,
            internalFormat: gl.RGBA,
            format: gl.RGBA,
            type: gl.UNSIGNED_BYTE
        });
        const metallicTexture = state.createTexture2D({
            image: metallicMap,
            width: 1,
            height: 1,
            internalFormat: gl.LUMINANCE,
            format: gl.LUMINANCE,
            type: gl.UNSIGNED_BYTE
        });
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
        const pbrSource = ShaderLib.pbr
            , brdfSource = ShaderLib.brdf
            , backgroundSource = ShaderLib.background
            , prefilterSource = ShaderLib.prefilter
            , toDToCubeMapSource = ShaderLib.convert_2d_to_cubemap
            , irrSource = ShaderLib.irradiance_convolution;

        const pbrProgramInfo = state.createProgramInfo(pbrSource.vs.getSource(), pbrSource.fs.getSource())
            , brdfProgramInfo = state.createProgramInfo(brdfSource.vs.getSource(), brdfSource.fs.getSource())
            ,
            backgroundProgramInfo = state.createProgramInfo(backgroundSource.vs.getSource(), backgroundSource.fs.getSource())
            ,
            prefilterProgramInfo = state.createProgramInfo(prefilterSource.vs.getSource(), prefilterSource.fs.getSource())
            ,
            toDToCubeMapProgramInfo = state.createProgramInfo(toDToCubeMapSource.vs.getSource(), toDToCubeMapSource.fs.getSource())
            , irrProgramInfo = state.createProgramInfo(irrSource.vs.getSource(), irrSource.fs.getSource());

        //state
        state.enableDepthTest(gl.DEPTH_TEST);
        state.setClearColor(0.0, 0.0, 0.0, 1.0);

        //convert 2d to cube texture
        state.viewport(0, 0, 512, 512);
        state.use(toDToCubeMapProgramInfo.program);
        state.setMat4("projection", captureProjection);
        state.setInt("equirectangularMap", 0);
        state.setTexture2D(hdrMap, 0);

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
        state.setInt("environmentMap", 0);
        state.setTextureCube(envCubeMap, 0, true);
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
        state.setInt("environmentMap", 0);

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
                state.setTextureCube(envCubeMap, 0, true);
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

        gl.cullFace(gl.FRONT);
        //pbr
        state.use(pbrProgramInfo.program);
        state.viewport(0, 0, canvas.width, canvas.height);
        state.setVao(sphereVAO);

        state.setMat4("projection", cameraProjection);
        state.setMat4("view", cameraView);
        state.setVec3("camPos", ...cameraPos);
        state.setFloat("opacity", 1.);
        state.setInt("irradianceMap", 0);
        state.setInt("prefilterMap", 1);
        state.setInt("brdfLUT", 2);
        state.setInt("albedoMap", 3);
        state.setInt("normalMap", 4);
        state.setInt("aoMap", 5);
        state.setInt("metallicMap", 6);
        state.setInt("roughnessMap", 5);

        state.setTextureCube(irradianceMap, 0);
        state.setTextureCube(prefilterMap, 1);
        state.setTexture2D(brdfMap, 2);
        state.setTexture2D(albedoTexture, 3);
        state.setTexture2D(normalTexture, 4);
        state.setTexture2D(aoTexture, 5);

        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const rowLen = 6;
        const colLen = 6;
        const space = sphereGeometry.radius;
        let model = glm.mat4.create();
        glm.mat4.translate(model, model, glm.vec3.set(glm.vec3.create(), -space * (rowLen - 1) / 2, -space * (colLen - 1) / 2, 0));
        let offsetH = glm.vec3.set(glm.vec3.create(), space, 0, 0);
        let offsetV = glm.vec3.set(glm.vec3.create(), 0, space, 0);

        for (let i = 0; i < lightPositions.length; ++i) {
            state.setVec3("pointLightPositions[" + i + "]", ...lightPositions[i]);
            state.setVec3("pointLightColors[" + i + "]", ...lightColors[i]);
        }

        for (let row = 0; row < rowLen; row++) {

            metallicMap[0] = 255 - 255 / rowLen * row;
            state.updateTexture2D({
                textureBuffer: metallicTexture,
                image: metallicMap,
                width: 1,
                height: 1,
                internalFormat: gl.LUMINANCE,
                format: gl.LUMINANCE,
                type: gl.UNSIGNED_BYTE
            });
            state.setTexture2D(metallicTexture, 6);
            let curModelPos = glm.vec3.scale(glm.vec3.create(), offsetH, row);
            for (let col = 0; col < colLen; col++) {
                roughnessMap[0] = 255 - 255 / colLen * col;
                state.updateTexture2D({
                    textureBuffer: roughnessTexture,
                    image: roughnessMap,
                    width: 1,
                    height: 1,
                    internalFormat: gl.LUMINANCE,
                    format: gl.LUMINANCE,
                    type: gl.UNSIGNED_BYTE
                });

                state.setTexture2D(roughnessTexture, 7);
                let resultModelPos = glm.vec3.add(glm.vec3.create(), curModelPos, glm.vec3.scale(glm.vec3.create(), offsetV, col));
                let resultModelView = glm.mat4.translate(glm.mat4.create(), model, resultModelPos);
                glm.mat4.rotate(resultModelView, resultModelView, Math.PI / 2, glm.vec3.set(glm.vec3.create(), -1, 1, 1));

                state.setMat4("model", resultModelView);
                state.drawElements(sphereGeometry.indices.data.length);
            }
        }

        state.use(backgroundProgramInfo.program);
        state.setMat4("view", cameraView);
        state.setMat4("projection", cameraProjection);
        state.setInt("environmentMap", 0);
        state.setTextureCube(envCubeMap, 0);
        state.setVao(cubeVAO);
        state.drawElements(cubeGeometry.indices.data.length);
    };

}

