import Matrix4 from "../math/Matrix4";

export default class Mesh_GL {
    constructor({
                    program
                    , vao
                    , geometry
                    , textures = {}
                    , renderTarget
                    , modelMatrix = new Matrix4()
                }) {

        this.program = program;
        this.vao = vao;
        this.geometry = geometry;
        this.renderTarget = renderTarget;
        this.textures = textures;
        this.modelMatrix = modelMatrix;
    }
    
}
