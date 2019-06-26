export  default  class WebGLCache {
    static getCacheByTarget(target,key,dataBak){
        let cacheData = target[key];
        if(!cacheData&&dataBak)WebGLCache.setCacheByTarget(target,key,dataBak);
        return cacheData;
    }
    static setCacheByTarget(target,key,data){
        return target[key] = data;
    }

    constructor() {
        this.programsInfo = {};
        this.uniforms = {};
        this.attributes = {};
        this.textures = {};
        this.frameBuffers = {};
        this.VAOs = {};
    }

    getUniform(key){
        return this.uniforms[key]
    }
    setUniform(key,data) {
        this.uniforms[key] = data;
    }

    getProgramInfo(key){
        return this.programsInfo[key]
    }
    setProgramInfo(key,data){
        this.programsInfo[key] = data;
    }

    getTexture(key){
        return this.textures[key];
    }
    setTexture(key,data){
        this.textures[key] = data;
    }

    getAttribute(key){
        return this.attributes[key];
    }
    setAttribute(key,data){
        this.attributes[key] = data;
    }

    getFrameBuffer(key){
        return this.frameBuffers[key];
    }
    setFrameBuffer(key,data){
        this.frameBuffers[key] = data;
    }

    getVAO(key){
        return this.VAOs[key];
    }
    setVAO(key,data){
        this.VAOs[key] = data;
    }


}

