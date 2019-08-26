import {
    WebglState2,
    ShaderLib,
    CubeGeometry,
    QuadGeometry,
    SphereGeometry, Mesh_GL, Texture2D_GL, TextureCube_GL
} from "../panda";

import FileLoader from "../panda/loader/FileLoader";
//import HDRLoader from "../../util/HDRLoader";

import * as glm from "gl-matrix";

export default class GL_Pbr {
    constructor() {
        this.state = null;
        this.canvas = null;
        this.sphereMeshInfo = null;
        this.backgroundMeshInfo = null;
        this.isAnimate = false;
    }

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

        const cameraPos = glm.vec3.set(glm.vec3.create(), 0, 0, 110);
        const cameraProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 3, canvas.width / canvas.height, 0.1, 500);
        const cameraView = glm.mat4.lookAt(glm.mat4.create()
            , glm.vec3.set(glm.vec3.create(), cameraPos[0], cameraPos[1], cameraPos[2])
            , glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0));


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

        const irradianceTexture = state.createTextureCube({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: 32, height: 32
        });

        //prefilter map
        const prefilterTexture = state.createTextureCube({
            internalFormat: gl.RGBA16F,
            format: gl.RGBA,
            type: gl.FLOAT,
            width: 128, height: 128,
            minF: gl.LINEAR_MIPMAP_LINEAR,
            levels: 5
        });


        const brdfTexture = state.createTexture2D({
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
            state.setCubeRenderTarget(captureRenderTarget, irradianceTexture, i);
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
                state.setCubeRenderTarget(captureRenderTarget, prefilterTexture, i, mip);
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
        state.setRenderTarget(captureRenderTarget, brdfTexture);
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
        for (let i = 0; i < lightPositions.length; ++i) {
            state.setVec3("pointLightPositions[" + i + "]", ...lightPositions[i]);
            state.setVec3("pointLightColors[" + i + "]", ...lightColors[i]);
        }
        state.use(backgroundProgramInfo.program);
        state.setMat4("view", cameraView);
        state.setMat4("projection", cameraProjection);
        state.setInt("environmentMap", 0);

        this.state = state;
        this.canvas = canvas;
        this.sphereMeshInfo = new Mesh_GL({
            program: pbrProgramInfo.program,
            vao: sphereVAO,
            geometry: sphereGeometry,
            projectionMatrix: cameraProjection,
            viewMatrix: cameraView,
            textures: {
                "irradianceMap": new Texture2D_GL({textureGL: irradianceTexture}),
                "prefilterMap": new Texture2D_GL({textureGL: prefilterTexture}),
                "brdfLUTMap": new Texture2D_GL({textureGL: brdfTexture}),
                "albedoMap": new Texture2D_GL({textureGL: albedoTexture}),
                "normalMap": new Texture2D_GL({textureGL: normalTexture}),
                "aoMap": new Texture2D_GL({textureGL: aoTexture}),
                "metallicMap": new Texture2D_GL({textureGL: metallicTexture, image: metallicMap}),
                "roughnessMap": new Texture2D_GL({textureGL: roughnessTexture, image: roughnessMap})
            },
        });

        this.backgroundMeshInfo = new Mesh_GL({
            program: backgroundProgramInfo.program,
            vao: cubeVAO,
            geometry: cubeGeometry,
            textures: {
                "environmentMap": new TextureCube_GL({textureGL: envCubeMap}),
            },
        });

        this.onResize();
        this.animate();
        window.addEventListener("resize", this.onResize, false);

        window.addEventListener("mousedown", this.onDown, false);
        window.addEventListener("touchstart", this.onDown, false);

    }

    onDown = () => {
        this.isAnimate = !this.isAnimate;
    };

    onResize = () => {
        const state = this.state;
        const width = this.canvas.width = window.innerWidth;
        const height = this.canvas.height = window.innerHeight;
        state.viewport(0, 0, width, height);
        const projectionMatrix = this.sphereMeshInfo.projectionMatrix;
        const viewMatrix = this.sphereMeshInfo.viewMatrix = glm.mat4.create();

        const cameraPos = glm.vec3.set(glm.vec3.create(), 0, 0, 100 + 50 * Math.max(height / width - 1, 0));

        glm.mat4.perspective(projectionMatrix, Math.PI / 3, width / height, 0.1, 500);
        glm.mat4.lookAt(viewMatrix
            , glm.vec3.set(glm.vec3.create(), cameraPos[0], cameraPos[1], cameraPos[2])
            , glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0));


        state.use(this.sphereMeshInfo.program);
        state.setMat4("projection", projectionMatrix);
        state.setMat4("view", viewMatrix);

        state.use(this.backgroundMeshInfo.program);
        state.setMat4("projection", projectionMatrix);
        state.setMat4("view", viewMatrix);

        this.reDraw();
    };

    animate() {
        this.reDraw();
        requestAnimationFrame(this.animate.bind(this));
    }

    reDraw() {
        const state = this.state
            , gl = state.getContext()
            , sphereMeshInfo = this.sphereMeshInfo
            , backMesh = this.backgroundMeshInfo
            , sphereVAO = sphereMeshInfo.vao
            , sphereGeo = sphereMeshInfo.geometry
            , textures = sphereMeshInfo.textures
            , rowLen = 6
            , colLen = 6;

        const space = sphereMeshInfo.geometry.radius + 1
            , irradianceTexture = textures["irradianceMap"].textureGL
            , prefilterTexture = textures["prefilterMap"].textureGL
            , brdfTexture = textures["brdfLUTMap"].textureGL
            , albedoTexture = textures["albedoMap"].textureGL
            , normalTexture = textures["normalMap"].textureGL
            , aoTexture = textures["aoMap"].textureGL

            , metallicMap = textures["metallicMap"].image
            , metallicTexture = textures["metallicMap"].textureGL
            , roughnessMap = textures["roughnessMap"].image
            , roughnessTexture = textures["roughnessMap"].textureGL
            , environmentTexture = backMesh.textures["environmentMap"].textureGL;

        let model = glm.mat4.create();
        const allOffsetX = this.isAnimate ? 0 : -space * (rowLen - 1) / 2;
        glm.mat4.translate(model, model, glm.vec3.set(glm.vec3.create(), allOffsetX, -space * (colLen - 1) / 2, 0));

        let offsetH = glm.vec3.set(glm.vec3.create(), space, 0, 0);
        let offsetV = glm.vec3.set(glm.vec3.create(), 0, space, 0);

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);

        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        state.use(sphereMeshInfo.program);
        state.setVao(sphereVAO);
        state.setTextureCube(irradianceTexture, 0);
        state.setTextureCube(prefilterTexture, 1);
        state.setTexture2D(brdfTexture, 2);
        state.setTexture2D(albedoTexture, 3);
        state.setTexture2D(normalTexture, 4);
        state.setTexture2D(aoTexture, 5);

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
                if (this.isAnimate) glm.mat4.rotate(model, model, Math.PI / 4 * Math.sin(new Date().getTime() / 10000), glm.vec3.set(glm.vec3.create(), 0, 1, 0));
                state.setTexture2D(roughnessTexture, 7);
                let resultModelPos = glm.vec3.add(glm.vec3.create(), curModelPos, glm.vec3.scale(glm.vec3.create(), offsetV, col));
                let resultModelView = glm.mat4.translate(glm.mat4.create(), model, resultModelPos);
                state.setMat4("model", resultModelView);
                state.drawElements(sphereGeo.indices.data.length);
            }
        }


        state.use(backMesh.program);
        state.setVao(backMesh.vao);
        state.setTextureCube(environmentTexture);
        state.drawElements(backMesh.geometry.indices.data.length);
    }

}

