import Matrix4 from "../math/Matrix4";

export default class Mesh_GL {
    constructor({
                    program
                    , vao
                    , geometry
                    , textures = {}
                    , renderTarget
                    , projectionMatrix = new Matrix4()
                    , viewMatrix = new Matrix4()
                    , modelMatrix = new Matrix4()
                }) {

        this.program = program;
        this.vao = vao;
        this.geometry = geometry;
        this.renderTarget = renderTarget;
        this.textures = textures;
        this.projectionMatrix = projectionMatrix;
        this.viewMatrix = viewMatrix;
        this.modelMatrix = modelMatrix;
    }

}
