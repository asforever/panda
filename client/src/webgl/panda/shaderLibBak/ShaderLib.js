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

const ShaderLib = {
    test: {
        vs: test_vs,
        fs: test_fs,
    },
    pbr: {
        vs: pbr_vs,
        fs: pbr_fs,
    },
    background: {
        vs: background_vs,
        fs: background_fs,
    },
    brdf: {
        vs: brdf_vs,
        fs: brdf_fs,
    },
    convert_2d_to_cubemap: {
        vs: cube_map_vs,
        fs: convert_2d_to_cubemap_fs,
    },
    irradiance_convolution: {
        vs: cube_map_vs,
        fs: irradiance_convolution_fs,
    },
    prefilter: {
        vs: cube_map_vs,
        fs: prefilter_fs,
    }
};

export default ShaderLib;
