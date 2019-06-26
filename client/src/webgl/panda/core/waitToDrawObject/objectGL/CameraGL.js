import Matrix4 from "../../../data/math/matrix/Matrix4";

export default class CameraGL{
    constructor(){
        this.uniforms = {};
    }
    parse(camera) {
        //ObjectGL.loadMatrixFromCache(cache,camera.projectionMatrix, camera.matrixInverse)
        let _projectionMatrix = new Matrix4();
        _projectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixInverse);
        this.uniforms = {
            u_projectionMatrix: _projectionMatrix.elements,
            u_cameraPosition: camera.position.toArray()
        };
    }
}
