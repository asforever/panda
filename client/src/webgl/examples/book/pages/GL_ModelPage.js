import FileLoader from "../../../panda/loader/FileLoader";
import GL_Page from "./GL_Page";
import {
    CubeGeometry, Mesh_GL,
    Object3D,
    OBJLoader,
    ParseStateObject3DMediator,
    QuadGeometry, RenderTarget_GL,
    ShaderLib, Vector3,
} from "../../../panda";
import * as glm from "gl-matrix";

export default class GL_ModelPage extends GL_Page {
    constructor(state, width, height) {
        super(state, width, height);
        this.opaqueMeshes = [];
        this.transparentMeshes = [];
    }

    async loadTexture() {
        if (!this.texture) {
            const lantern = await new OBJLoader().load("./assets/model/lantern/lantern_obj.obj");
            const hdrEnvMap = await new FileLoader().load("./assets/textures/hdr/skybox.png", undefined, FileLoader.IMAGE);

            const albedoMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Base_Color.jpg", undefined, FileLoader.IMAGE);
            const aoMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Mixed_AO.jpg", undefined, FileLoader.IMAGE);
            const normalMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Normal_OpenGL.jpg", undefined, FileLoader.IMAGE);
            const metallicMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Metallic.jpg", undefined, FileLoader.IMAGE);
            const roughnessMap = await new FileLoader().load("./assets/model/lantern/textures/lantern_Roughness.jpg", undefined, FileLoader.IMAGE);
            //data
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            const captureProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, 1, 0.1, 10);
            const captureViews = [
                glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 1, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
                glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), -1, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
                glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0), glm.vec3.set(glm.vec3.create(), 0, 0, 1)),
                glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, -1, 0), glm.vec3.set(glm.vec3.create(), 0, 0, -1)),
                glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 0, 1), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
                glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 0, -1), glm.vec3.set(glm.vec3.create(), 0, -1, 0)),
            ];

            const cameraProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 3, this.width / this.height, 0.1, 400);
            const cameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 80, 80, 80), glm.vec3.set(glm.vec3.create(), 0, 50, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0));
            const cameraPos = [80, 80, 80];

            const cubeGeometry = new CubeGeometry();
            const quadGeometry = new QuadGeometry();

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
                glm.vec3.set(glm.vec3.create(), 1000, 0, 300),
                glm.vec3.set(glm.vec3.create(), 300, 0, 1000),
                glm.vec3.set(glm.vec3.create(), 300, 1000, 300),
                glm.vec3.set(glm.vec3.create(), 300, 0, 300)
            ];

            //ctx
            const state = this.state, gl = state.getContext();

            gl.getExtension('EXT_color_buffer_float');
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.FRONT);

            const cubeVAO = state.createVaoFromGeometry(cubeGeometry);
            const quadVAO = state.createVaoFromGeometry(quadGeometry);

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

            this.texture = state.createTexture2D({
                internalFormat: gl.RGBA16F,
                format: gl.RGBA,
                type: gl.FLOAT,
                width: this.width, height: this.height,
            });


            //program
            const pbrSource = ShaderLib.pbr
                , brdfSource = ShaderLib.brdf
                // , backgroundSource = ShaderLib.background
                , prefilterSource = ShaderLib.prefilter
                , toDToCubeMapSource = ShaderLib.convert_2d_to_cubemap
                , irrSource = ShaderLib.irradiance_convolution;

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
                irrProgramInfo = state.createProgramInfo(irrSource.vs.getSource(), irrSource.fs.getSource())

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
            state.viewport(0, 0, this.width, this.height);
            state.resizeRenderTarget(captureRenderTarget, this.width, this.height);

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

            //buffer

            modelObject3D.children.forEach((mesh, key) => {
                let meshInfo = new Mesh_GL({
                    program: pbrProgramInfo.program,
                    vao: state.createVaoFromGeometry(mesh.geometry),
                    geometry: mesh.geometry,
                    renderTarget: new RenderTarget_GL({target: captureRenderTarget, texture: this.texture})
                });

                if (mesh.name !== "glass lantern") {
                    this.opaqueMeshes.push(meshInfo);
                } else {
                    this.transparentMeshes.push(meshInfo);
                }

            });

        }
        this.update();
        return this.texture;
    }

    update() {
        const state = this.state, gl = state.getContext();

        //draw pbr model
        const program = this.opaqueMeshes[0].program;
        const renderTarget = this.opaqueMeshes[0].renderTarget;
        const modelMatrix = this.opaqueMeshes[0].modelMatrix;

        state.use(program);
        state.setRenderTarget(renderTarget.target, renderTarget.texture);
        state.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        modelMatrix.rotationByAxis(Math.PI / 180, new Vector3(0, 1, 0));

        state.setMat4("model", modelMatrix.data);

        this.opaqueMeshes.forEach((meshInfo) => {
            gl.disable(gl.BLEND);
            state.setVao(meshInfo.vao);
            state.setFloat("opacity", 1.0);
            state.drawArray(meshInfo.geometry.attributes["position"].data.length / 3);
        });
        this.transparentMeshes.forEach((meshInfo) => {
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

            gl.cullFace(gl.FRONT);

            state.setVao(meshInfo.vao);
            state.setFloat("opacity", 0.8);
            state.drawArray(meshInfo.geometry.attributes["position"].data.length / 3);
        });

        gl.disable(gl.BLEND);
        state.unBindRenderTarget();
    }

    getTexture() {
        return this.texture;
    }

}
