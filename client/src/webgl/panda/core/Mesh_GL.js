export default class Mesh_GL {
    constructor({program, vao, geometry, textures, renderTarget}) {
        this.program = program;
        this.vao = vao;
        this.geometry = geometry;
        this.renderTarget = renderTarget;
        this.textures = textures || {};
    }

    addTexture(key, texture2D_GL) {
        this.textures[key] = texture2D_GL;
    }
}