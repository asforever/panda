import Geometry from "./Geometry";
import BufferAttribute from "./BufferAttribute";
export default class TriangleGeometry extends Geometry {
    constructor() {
        super();
        this.init();
    }
    init(){
        const position = [
            // Front face
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            0, 1.0, 0.0,
        ];
        const normal = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
        ];
        const uv = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            0.5, 1.0,
        ];
        const indices = [
            0,1,2
        ];
        this.addAttribute("position", new BufferAttribute({name:"position" ,data:new Float32Array(position),componentNum:3}));
        this.addAttribute("normal",  new BufferAttribute({name:"normal"   ,data:new Float32Array(normal) ,componentNum:3}));
        this.addAttribute("uv",         new BufferAttribute({name:"uv"          ,data:new Float32Array(uv)         ,componentNum:2}));
        this.setIndex(                       new BufferAttribute({name:"indices"   ,data:new Int16Array(indices)       ,componentNum:1}));
    }

}
