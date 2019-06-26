import raw from "raw.macro";

const precision = raw('./glsl/common/precision.glsl');
const diffuse_map = raw('./glsl/common/diffuse_map.glsl');
const specular_map = raw('./glsl/common/specular_map.glsl');
const normal_map = raw('./glsl/common/normal_map.glsl');
const ao_map = raw('./glsl/common/ao_map.glsl');
const roughness_map = raw('./glsl/common/roughness_map.glsl');
const metallic_map = raw('./glsl/common/metallic_map.glsl');

const env_map = raw('./glsl/common/env_map.glsl');
const ambient_light = raw('./glsl/common/ambient_light.glsl');
const dir_light = raw('./glsl/common/dir_light.glsl');
const point_light = raw('./glsl/common/point_light.glsl');
const spot_light = raw('./glsl/common/spot_light.glsl');
const all_light = raw('./glsl/common/all_light.glsl');

const base_vert = raw('./glsl/base/base_vert.glsl');
const base_frag = raw('./glsl/base/base_frag.glsl');

const phong_vert = raw('./glsl/phong/phong_vert.glsl');
const phong_frag = raw('./glsl/phong/phong_frag.glsl');

//const inversion_vert = raw('./glsl/inversion_vert.glsl');
const inversion_frag = raw('./glsl/inversion/inversion_frag.glsl');
//const grayscale_vert = raw('./glsl/grayscale_vert.glsl');
const grayscale_frag = raw('./glsl/grayscale/grayscale_frag.glsl');
//const kernel_vert = raw('./glsl/kernel_vert.glsl');
const kernel_frag = raw('./glsl/kernel/kernel_frag.glsl');
const pbr_frag = raw('./glsl/pbr/pbr_frag.glsl');

let ShaderSource = {
    common:{
        precision: precision,
        diffuse_map: diffuse_map,
        specular_map: specular_map,
        ambient_light: ambient_light,
        dir_light: dir_light,
        point_light: point_light,
        spot_light: spot_light,
        all_light: all_light,
    },
    base: {
        vsSource: base_vert,
        fsSource:
            precision
            + diffuse_map
            + base_frag,
    },
    phong: {
        vsSource: phong_vert,
        fsSource:
            precision
            + diffuse_map
            + specular_map
            + env_map
            + ambient_light
            + dir_light
            + point_light
            + spot_light
            + all_light
            + phong_frag,
    },
    inversion: {
        vsSource: base_vert,
        fsSource:
            precision
            + diffuse_map
            + inversion_frag,
    },
    grayscale: {
        vsSource: base_vert,
        fsSource:
            precision
            + diffuse_map
            + grayscale_frag,
    },
    kernel: {
        vsSource: phong_vert,
        fsSource:
            precision
            + diffuse_map
            + kernel_frag,
    },
    pbr: {
        vsSource: phong_vert,
        fsSource:
            precision
            + diffuse_map
            + normal_map
            + roughness_map
            + metallic_map
            + ao_map
            + pbr_frag
    }
};
export default ShaderSource;
