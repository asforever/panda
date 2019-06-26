import GMath from "../math/GMath";
import WebglConst from "../../const/WebglConst";
import TextureConst from "../../const/TextureConst";

export default class TextureCube {
    constructor(config = {}) {
        this.UUID = GMath.generateUUID();
        this.type = TextureConst.TEXTURE_CUBE;
        this.image = config.image;//[top,bottom,left,right,front,right]
        this.needsUpdate = true;
        this.wrapS = WebglConst.REPEAT;
        this.wrapT = WebglConst.REPEAT;
    }

}
