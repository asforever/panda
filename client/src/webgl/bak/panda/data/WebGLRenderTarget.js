import GMath from "./math/GMath";

export default class WebGLRenderTarget {

    constructor(texture,width,height) {
        this.UUID = GMath.generateUUID();
        this.texture = texture;
        this.width = width;
        this.height = height;
    }

    updateSize(width,height){
        this.width = width;
        this.height = height;
        this.texture.needsUpdate = true;
    }
}
