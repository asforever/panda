import Matrix4 from "../../data/math/matrix/Matrix4";
import TextureConst from "../../const/TextureConst";

export default class CacheStateMediator {
    static loadMatrixFromCache({cache,uuid,matrices}){
        let needUpdate = false;
        matrices.forEach((matrix)=>{
            needUpdate = matrix.needsUpdate||needUpdate;
        });

        let resultMatrix = cache.getUniform(uuid);
        if (!resultMatrix||needUpdate) {
            resultMatrix = new Matrix4();
            matrices.forEach((lMat,cMat)=>{
                resultMatrix.multiplyMatrices(lMat,cMat);
                return cMat;
            });
        }
        return resultMatrix;

    }

    static loadTextureFrameBufferCache({state,cache,uuid, texture}){
        let frameBuffer = cache.getFrameBuffer(uuid);
        if (!frameBuffer) {
            frameBuffer =  state.genFramebufferTexture(texture);
            cache.setFrameBuffer(uuid, frameBuffer);
        }
        return frameBuffer;
    }

    static loadVAOFromCache({state,cache,uuid}){
        let VAO = cache.getVAO(uuid);
        if (!VAO) {
            VAO =  state.createVAO();
            cache.setVAO(uuid, VAO);
        }
        return VAO;
    }

    static loadAttributeFromCache({state,cache,uuid,bufferAttribute,isIndices}){
        let {data,componentNum,needsUpdate} = bufferAttribute;

        let bufferAttributeGL = cache.getAttribute(uuid);
        if (!bufferAttributeGL) {
            bufferAttributeGL =  state.createAttributeBufferArrayInfo(data, componentNum, isIndices);
            cache.setAttribute(uuid, bufferAttributeGL);
        }else if(needsUpdate){
            state.updateAttributeBufferArrayInfo(bufferAttributeGL,bufferAttribute.data);
        }

        let attributesSubData = bufferAttribute.attributesSubData;
        if(attributesSubData.length>0){
            attributesSubData.forEach(attributeSubData=>{
                state.updateSubAttributeBufferArrayInfo(bufferAttributeGL,attributeSubData.offset,attributeSubData.data);
                attributeSubData.needsUpdate = false;
            });
        }
        bufferAttribute.needsUpdate = false;
        return bufferAttributeGL;
    }
    static loadProgramInfoFromCache({state,cache,uuid,shaderSource}) {
        let programInfo = cache.getProgramInfo(uuid);
        if (!programInfo) {
            programInfo = state.createProgramInfo(shaderSource.vsSource, shaderSource.fsSource);
            cache.setProgramInfo(uuid, programInfo);
        }
        return programInfo;
    }

    static loadTextureFromCache({state,cache,map,width = undefined,height = undefined}){
        let uuid = map.UUID;
        let isCubeTexture = map.type === TextureConst.TEXTURE_CUBE;
        let textureBuffer = cache.getTexture(uuid);
        let needsUpdate = map.needsUpdate;
        if(!textureBuffer){
            textureBuffer = state.genTexture({wrapS: map.wrapS, wrapT: map.wrapT,isCubeTexture:isCubeTexture});
            cache.setTexture(uuid,textureBuffer);
            needsUpdate = true;
        }

        if(needsUpdate){
            state.updateTexture(textureBuffer, map.image,width,height,0,undefined,isCubeTexture);
            map.needsUpdate = false;
        }
        return textureBuffer;
    }
}
