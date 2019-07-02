import {WebglState, ShaderLib, Vector3, WebglRenderTarget, WebglTexture2D, WebglTextureCube} from "../panda";
import FileLoader from "../../util/FileLoader";

import * as glm from "gl-matrix";

export default class GL_Pbr {

    async setUp(canvas) {
        const fileLoader = new FileLoader();
        const hdrEnvMap = await fileLoader.load("./assets/textures/awesomeface.png", undefined, FileLoader.IMAGE);

        const state = new WebglState(canvas);
        const gl = state.getContext();
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        const pbrSource = ShaderLib.pbr;
        const pbrProgram = state.createProgram(pbrSource.vs, pbrSource.fs);

        const brdfSource = ShaderLib.brdf;
        const brdfProgram = state.createProgram(brdfSource.vs, brdfSource.fs);

        const backgroundSource = ShaderLib.background;
        const backgroundProgram = state.createProgram(backgroundSource.vs, backgroundSource.fs);

        const convert2dToCubemapSource = ShaderLib.convert_2d_to_cubemap;
        const convert2dToCubemapProgram = state.createProgram(convert2dToCubemapSource.vs, convert2dToCubemapSource.fs);

        const irradianceConvolutionSource = ShaderLib.irradiance_convolution;
        const irradianceConvolutionProgram = state.createProgram(convert2dToCubemapSource.vs, irradianceConvolutionSource.fs);

        const prefilterSource = ShaderLib.irradiance_convolution;
        const prefilterProgram = state.createProgram(convert2dToCubemapSource.vs, prefilterSource.fs);

        state.use(pbrProgram);
        state.setInt("irradianceMap", 0);
        state.setInt("prefilterMap", 1);
        state.setInt("brdfLUT", 2);
        state.setVec3("albedo", 0.5, 0.0, 0.0);
        state.setFloat("ao", 1.0);

        state.use(backgroundProgram);
        state.setInt("environmentMap", 0);

        const lightPositions = [
            new Vector3(10, 10, 10),
            new Vector3(-10, -10, 10),
            new Vector3(10, -10, 10)
        ];

        const lightColors = [
            new Vector3(300, 300, 300),
            new Vector3(300, 300, 300),
            new Vector3(300, 300, 300)
        ];

        const nrRows = 7;
        const nrColumns = 7;
        const spacing = 2.5;

        const renderTarget = new WebglRenderTarget(gl, 500, 500);
        const envMap = new WebglTexture2D(gl, hdrEnvMap);
        const prefilterMap = new WebglTextureCube(gl);

        const captureProjection = glm.mat4.perspective(glm.mat4.create(), Math.PI / 4, 1.0, 0.1, 10);


    };

}
