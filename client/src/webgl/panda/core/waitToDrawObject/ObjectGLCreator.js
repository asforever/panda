import RenderTargetGL from "./objectGL/RenderTargetGL";
import shaderStoreGL from "../shaderStore/ShaderStore";
import CameraGL from "./objectGL/CameraGL";
import AmbientLightGL from "./objectGL/AmbientLightGL";
import DirectionalLightGL from "./objectGL/DirectionalLightGL";
import SpotLightGL from "./objectGL/SpotLightGL";
import PointLightGL from "./objectGL/PointLightGL";
import MeshGL from "./objectGL/MeshGL";
import MaterialGL from "./objectGL/MaterialGL";
import GeometryGL from "./objectGL/GeometryGL";
import WaitToDrawObject from "./objectGL/WaitToDrawObject";

export default class ObjectGLCreator {
    static createRenderTargetGL() {
        return new RenderTargetGL();
    }

    static createShaderStoreGL() {
        shaderStoreGL.reset();
        return shaderStoreGL;
    }

    static createCameraGL() {
        return new CameraGL();
    }

    static createAmbientLightGL() {
        return new AmbientLightGL();
    }

    static createDirectionalLightGL() {
        return new DirectionalLightGL();
    }

    static createSpotLightGL() {
        return new SpotLightGL();
    }

    static createPointLightGL() {
        return new PointLightGL();
    }

    static createMaterialGL() {
        return new MaterialGL();
    }
    static createGeometryGL() {
        return new GeometryGL();
    }
    static createMeshGL() {
        return new MeshGL();
    }

    static createWaitToDrawObject() {
        return new WaitToDrawObject();
    }
}
