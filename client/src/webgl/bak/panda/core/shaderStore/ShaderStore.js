import ShaderSourceChunk from "./ShaderSourceChunk"
import MaterialConst from "../../const/MaterialConst";
import TextureConst from "../../const/TextureConst";
import GLSLConst from "../../const/GLSLConst";

class ShaderStore {
    constructor() {
        this.source = null;
    }

    parseLight({dirLightNum, ambientLightNum, pointLightNum, spotLightNum}) {
        const sourceChunk = this.source;

        if (dirLightNum > 0) {
            sourceChunk.phongFS = "#define NUM_DIR_LIGHT " + dirLightNum + "\n" + sourceChunk.phongFS;
        }
        if (ambientLightNum > 0) {
            sourceChunk.phongFS = "#define NUM_AMB_LIGHT " + ambientLightNum + "\n" + sourceChunk.phongFS;
        }
        if (pointLightNum > 0) {
            sourceChunk.phongFS = "#define NUM_POINT_LIGHT " + pointLightNum + "\n" + sourceChunk.phongFS;
        }
        if (spotLightNum > 0) {
            sourceChunk.phongFS = "#define NUM_SPOT_LIGHT " + spotLightNum + "\n" + sourceChunk.phongFS;
        }

    }

    parseMaterial(material) {
        const materialType = material.type
            , sourceChunk = this.source;

        let vsSource = "", fsSource = "";

        let mapID = material.map ? material.map.type : ""
            , specularMapID = material.specularMap ? material.specularMap.type : ""
            , envMapID = material.envMap ? material.envMap.type : ""
            , normalMapID = material.normalMap ? material.normalMap.type : ""
            , roughnessMapID = material.roughnessMap ? material.roughnessMap.type : ""
            , metallicMapID = material.metallicMap ? material.metallicMap.type : ""
            , aoMapID = material.aoMap ? material.aoMap.type : "";

        let shaderID = materialType + mapID + specularMapID + envMapID;

        //texture
        if (mapID === TextureConst.TEXTURE_2D) {
            fsSource += GLSLConst.USE_DIFFUSE_MAP
        } else if (mapID === TextureConst.TEXTURE_CUBE) {
            fsSource += GLSLConst.USE_DIFFUSE_MAP_CUBE
        }

        if (specularMapID === TextureConst.TEXTURE_2D) {
            fsSource += GLSLConst.USE_SPECULAR_MAP
        } else if (specularMapID === TextureConst.TEXTURE_CUBE) {
            fsSource += GLSLConst.USE_SPECULAR_MAP_CUBE
        }

        if (normalMapID === TextureConst.TEXTURE_2D) {
            fsSource += GLSLConst.USE_NORMAL_MAP
        }

        if (roughnessMapID === TextureConst.TEXTURE_CUBE) {
            fsSource += GLSLConst.USE_ROUGHNESS_MAP
        }

        if (metallicMapID === TextureConst.TEXTURE_CUBE) {
            fsSource += GLSLConst.USE_METALLIC_MAP
        }

        if (aoMapID === TextureConst.TEXTURE_CUBE) {
            fsSource += GLSLConst.USE_AO_MAP
        }

        if (envMapID === TextureConst.TEXTURE_CUBE) {
            fsSource += GLSLConst.USE_ENV_MAP_CUBE
        }

        switch (materialType) {
            case MaterialConst.MESH_BASIC_MATERIAL:
                vsSource += sourceChunk.baseVS;
                fsSource += sourceChunk.baseFS;
                break;
            case MaterialConst.MESH_PHONG_MATERIAL:
                vsSource += sourceChunk.phongVS;
                fsSource += sourceChunk.phongFS;
                break;
            case MaterialConst.MESH_INVERSION_MATERIAL:
                vsSource += sourceChunk.inversionVS;
                fsSource += sourceChunk.inversionFS;
                break;
            case MaterialConst.MESH_GRAYSCALE_MATERIAL:
                vsSource += sourceChunk.grayscaleVS;
                fsSource += sourceChunk.grayscaleFS;
                break;
            case MaterialConst.MESH_KERNEL_MATERIAL:
                vsSource += sourceChunk.kernelVS;
                fsSource += sourceChunk.kernelFS;
                break;
            case MaterialConst.MESH_PBR_MATERIAL:
                vsSource += sourceChunk.pbrVS;
                fsSource = "#extension GL_EXT_shader_texture_lod : enable\n"
                    + "#extension GL_OES_standard_derivatives : enable\n"
                    + sourceChunk.pbrFS;

                break;
            default:
                break;
        }

        return {
            id: shaderID,
            vsSource: vsSource,
            fsSource: fsSource
        }
    }


    reset() {

        this.source = {
            baseVS: ShaderSourceChunk.base.vsSource,
            baseFS: ShaderSourceChunk.base.fsSource,
            phongVS: ShaderSourceChunk.phong.vsSource,
            phongFS: ShaderSourceChunk.phong.fsSource,
            inversionVS: ShaderSourceChunk.inversion.vsSource,
            inversionFS: ShaderSourceChunk.inversion.fsSource,
            grayscaleVS: ShaderSourceChunk.grayscale.vsSource,
            grayscaleFS: ShaderSourceChunk.grayscale.fsSource,
            kernelVS: ShaderSourceChunk.kernel.vsSource,
            kernelFS: ShaderSourceChunk.kernel.fsSource,
            pbrVS: ShaderSourceChunk.pbr.vsSource,
            pbrFS: ShaderSourceChunk.pbr.fsSource,
        }
    }
}

export default new ShaderStore();
