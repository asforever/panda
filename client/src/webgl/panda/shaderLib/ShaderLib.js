/* eslint import/no-webpack-loader-syntax: off */
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
import convert_2d_to_cubemap_vs from '!raw-loader!glslify-loader!./convert_2d_to_cubemap/convert_2d_to_cubemap_vs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import convert_2d_to_cubemap_fs from '!raw-loader!glslify-loader!./convert_2d_to_cubemap/convert_2d_to_cubemap_fs.glsl';

/* eslint import/no-webpack-loader-syntax: off */
import irradiance_convolution_fs
    from '!raw-loader!glslify-loader!./irradiance_convolution/irradiance_convolution_fs.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import prefilter_fs from '!raw-loader!glslify-loader!./prefilter/prefilter_fs.glsl';

const ShaderLib = {
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
        vs: convert_2d_to_cubemap_vs,
        fs: convert_2d_to_cubemap_fs,
    },
    irradiance_convolution: {
        fs: irradiance_convolution_fs,
    },
    prefilter_fs: {
        fs: prefilter_fs,
    }
};

export default ShaderLib;
