/* eslint import/no-webpack-loader-syntax: off */
import test_vs from '!raw-loader!glslify-loader!./test/test_vs.glsl';
import test_fs from '!raw-loader!glslify-loader!./test/test_fs.glsl';

import pbr_vs from '!raw-loader!glslify-loader!./pbr/pbr_vs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import pbr_fs from '!raw-loader!glslify-loader!./pbr/pbr_fs.glsl';

/* eslint import/no-webpack-loader-syntax: off */
import background_vs from '!raw-loader!glslify-loader!./background/background_vs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import background_fs from '!raw-loader!glslify-loader!./background/background_fs.glsl';

/* eslint import/no-webpack-loader-syntax: off */
import brdf_vs from '!raw-loader!glslify-loader!./brdf/brdf_vs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import brdf_fs from '!raw-loader!glslify-loader!./brdf/brdf_fs.glsl';

/* eslint import/no-webpack-loader-syntax: off */
import cube_map_vs from '!raw-loader!glslify-loader!./cubeMap/cube_map_vs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import convert_2d_to_cubemap_fs from '!raw-loader!glslify-loader!./convert_2d_to_cubemap/convert_2d_to_cubemap_fs.glsl';

/* eslint import/no-webpack-loader-syntax: off */
import irradiance_convolution_fs
    from '!raw-loader!glslify-loader!./irradiance_convolution/irradiance_convolution_fs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import prefilter_fs from '!raw-loader!glslify-loader!./prefilter/prefilter_fs.glsl';
import ShaderSource from "./ShaderSource";

const ShaderLib = {
    test: {
        vs: new ShaderSource().addMain(test_vs),
        fs: new ShaderSource().addMain(test_fs).setPrecision("mediump")
    },
    pbr: {
        vs: new ShaderSource().addMain(pbr_vs),
        fs: new ShaderSource().addMain(pbr_fs).setPrecision("mediump")
    },
    background: {
        vs: new ShaderSource().addMain(background_vs),
        fs: new ShaderSource().addMain(background_fs).setPrecision("mediump")
    },
    brdf: {
        vs: new ShaderSource().addMain(brdf_vs),
        fs: new ShaderSource().addMain(brdf_fs).setPrecision("mediump")
    },
    convert_2d_to_cubemap: {
        vs: new ShaderSource().addMain(cube_map_vs),
        fs: new ShaderSource().addMain(convert_2d_to_cubemap_fs).setPrecision("mediump")
    },
    irradiance_convolution: {
        vs: new ShaderSource().addMain(cube_map_vs),
        fs: new ShaderSource().addMain(irradiance_convolution_fs).setPrecision("mediump")
    },
    prefilter: {
        vs: new ShaderSource().addMain(cube_map_vs),
        fs: new ShaderSource().addMain(prefilter_fs).setPrecision("mediump")
    }
};

export default ShaderLib;
