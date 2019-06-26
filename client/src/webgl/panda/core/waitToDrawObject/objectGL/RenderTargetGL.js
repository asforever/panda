import CacheStateMediator from "../../mediator/CacheStateMediator";

class RenderTargetGL {
    constructor() {
        this.UUID = null;
        this.fbo = null;
        this.texture = null;
    }

    parse(state, cache, renderTarget) {
        if (!renderTarget) return;
        let map = renderTarget.texture
         ,width =  renderTarget.width
         ,height =  renderTarget.height;
        this.UUID = renderTarget.UUID;
        let texture = this.texture = CacheStateMediator.loadTextureFromCache({state, cache, map, width, height});
        this.fbo = CacheStateMediator.loadTextureFrameBufferCache({state, cache, uuid:renderTarget.UUID, texture});
    }
}

export default RenderTargetGL;
