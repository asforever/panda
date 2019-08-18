/* eslint import/no-webpack-loader-syntax: off */
import test_vs from '!raw-loader!glslify-loader!./test/test_vs.glsl';
import test_fs from '!raw-loader!glslify-loader!./test/test_fs.glsl';

import common_vs from '!raw-loader!glslify-loader!./common/common_vs.glsl';
import book_fs from '!raw-loader!glslify-loader!./book/book_fs.glsl';

import pbr_fs from '!raw-loader!glslify-loader!./pbr/pbr_fs.glsl';
import background_vs from '!raw-loader!glslify-loader!./background/background_vs.glsl';
import background_fs from '!raw-loader!glslify-loader!./background/background_fs.glsl';
import brdf_vs from '!raw-loader!glslify-loader!./brdf/brdf_vs.glsl';
import brdf_fs from '!raw-loader!glslify-loader!./brdf/brdf_fs.glsl';
import cube_map_vs from '!raw-loader!glslify-loader!./cubeMap/cube_map_vs.glsl';
import convert_2d_to_cubemap_fs from '!raw-loader!glslify-loader!./convert_2d_to_cubemap/convert_2d_to_cubemap_fs.glsl';
import irradiance_convolution_fs from '!raw-loader!glslify-loader!./irradiance_convolution/irradiance_convolution_fs.glsl';
import prefilter_fs from '!raw-loader!glslify-loader!./prefilter/prefilter_fs.glsl';
import ShaderSource from "./ShaderSource";

const ShaderLib = {
    test: {
        vs: new ShaderSource().addMain(test_vs),
        fs: new ShaderSource().addMain(test_fs).setPrecision("mediump")
    },
    book: {
        vs: new ShaderSource().addMain(common_vs),
        fs: new ShaderSource().addMain(book_fs).setPrecision("mediump")
    },
    pbr: {
        vs: new ShaderSource().addMain(common_vs),
        fs: new ShaderSource().addMain(pbr_fs).setPrecision("mediump").addDefine("POINT_LIGHT_NUMBER",4)
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
