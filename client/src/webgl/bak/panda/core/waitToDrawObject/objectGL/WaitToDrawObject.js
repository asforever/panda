import Matrix4 from "../../../data/math/matrix/Matrix4";
import Vector3 from "../../../data/math/vector/Vector3";

export default class WaitToDrawObject {
    constructor() {
        this.programInfo = null;
        this.uniforms = null;
        this.attributes = null;
        this.indices = null;
        this.drawSize = 0;
        this.capabilities = null;
        this.depth = 0;
    }
    setUp({programInfo,uniforms,attributes,indices,drawSize,VAO,needsUpdateVAO,capabilities}){
        this.programInfo = programInfo;
        this.uniforms = uniforms;
        this.attributes = attributes;
        this.indices = indices;
        this.drawSize = drawSize;
        this.VAO = VAO;
        this.needsUpdateVAO = needsUpdateVAO;
        this.capabilities =capabilities;
    }
    mergeUniforms() {
        return Object.assign(this.uniforms, ...arguments);
    }

    needSort(){
        return this.capabilities.transparent;
    }

    reCalcDepth(){
        let uniforms = this.uniforms;
        if(!uniforms.u_projectionMatrix||!uniforms.u_modelViewMatrix){
            console.warn("Can't be sorted because there is no u_projectionMatrix||u_modelViewMatrix")
        }

        let projectionMat4 = new Matrix4();
        let modelViewMat4 = new Matrix4();

        let tempVector = new Vector3();
        projectionMat4.elements = this.uniforms.u_projectionMatrix;
        modelViewMat4.elements = this.uniforms.u_modelViewMatrix;
        this.depth = tempVector.setFromMatrixPosition(modelViewMat4).applyMatrix4(projectionMat4).z;
    }
}
