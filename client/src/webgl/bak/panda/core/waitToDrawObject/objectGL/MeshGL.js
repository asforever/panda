export default class MeshGL{
    constructor() {
        this.uniforms = {};
    }

    parse(cache,mesh) {
        this.uniforms = {
            u_modelViewMatrix:mesh.matrix.elements,
            u_normalMatrix:mesh.normalMatrix.elements
        }
    }
}
