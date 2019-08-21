import FileLoader from "../../../panda/loader/FileLoader";
import GL_Page from "./GL_Page";

export default class GL_TitlePage extends GL_Page{

    async loadTexture() {
        if (!this.texture) {
            const hdrEnvMap = await new FileLoader().load("./assets/textures/hdr/skybox.png", undefined, FileLoader.IMAGE);

            const state = this.state, gl = state.getContext();
            this.texture = state.createTexture2D({
                image: hdrEnvMap,
                internalFormat: gl.RGBA16F,
                format: gl.RGBA,
                type: gl.FLOAT
            });
        }
        return this.texture;
    }

    getTexture() {
        return this.texture;
    }

}
