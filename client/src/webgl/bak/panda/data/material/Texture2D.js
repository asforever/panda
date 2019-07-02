import GMath from "../math/GMath";
import WebglConst from "../../const/WebglConst";
import TextureConst from "../../const/TextureConst";

export default class Texture2D {
    constructor({image} = {}) {
        this.type = TextureConst.TEXTURE_2D;
        this.UUID = GMath.generateUUID();
        this.isTexture = true;

        this.image = image;//1:undefine( will gen 1px image ),2:null,3:Image
        this.needsUpdate = true;
        this.wrapS = WebglConst.REPEAT;
        this.wrapT = WebglConst.REPEAT;
    }

    load(imageSrc) {
        let scope = this;
        return new Promise((r) => {
            if (scope.image) {
                r(scope.image);
                return;
            }

            let image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                scope.needsUpdate = true;
                scope.image = image;
                r(scope.image);
            };
        });


    }

}
