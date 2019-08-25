import GL_Page from "./GL_Page";

export default class GL_NullPage extends GL_Page{

    async loadTexture() {
        if (!this.texture) {
            const state = this.state;
            this.texture = state.createTexture2D({
                image: new Uint8Array([0,0,0,255]),
                width: 1,
                height: 1,

            });
        }
        return this.texture;
    }

    getTexture() {
        return this.texture;
    }

    update() {
    }

}
