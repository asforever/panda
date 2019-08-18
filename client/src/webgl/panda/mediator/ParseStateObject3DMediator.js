import Geometry from "../Object3D/geometry/Geometry";
import Material from "../Object3D/material/Material";
import Mesh from "../Object3D/Mesh";
import BufferAttribute from "../Object3D/geometry/BufferAttribute";

export default class ParseStateObject3DMediator {


    parse(object3D, parseState) {
        parseState.objects.forEach(object => {
            if (object.geometry.vertices.length <= 0) return;

            let geometry = this.parseGeometry(object.geometry);
            let material = this.parseMaterial(object.materials);
            let mesh = new Mesh(geometry, material);
            mesh.name = object.name;
            object3D.add(mesh);
        });
        return object3D;
    }

    parseGeometry(geometryData) {
        let modelGeometry = new Geometry();
        modelGeometry.addAttribute("position", new BufferAttribute({
            name: "position",
            data: new Float32Array(geometryData.vertices),
            componentNum: 3
        }), 3);
        modelGeometry.addAttribute("uv", new BufferAttribute({
            name: "uv",
            data: new Float32Array(geometryData.uvs),
            componentNum: 2
        }), 3);
        modelGeometry.addAttribute("normal", new BufferAttribute({
            name: "normal",
            data: new Float32Array(geometryData.normals),
            componentNum: 3
        }), 3);

        return modelGeometry;
    }

    parseMaterial(materialsData) {
        return new Material();
    }
}
