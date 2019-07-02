import Geometry from "./Geometry";
import BufferAttribute from "./BufferAttribute";

export default class PlaneGeometry extends Geometry {
    constructor() {
        super();
        this.init();
    }
    init(){
        const position = [
            -1, 0, 1,
            1, 0, 1,
            1, 0, -1,
            -1, 0, -1
        ];
        const normal = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ];
        const uv = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];
        const indices = [
            0, 1, 2,
            0, 2, 3
        ];
        this.addAttribute("position", new BufferAttribute({name:"position" ,data:new Float32Array(position),componentNum:3}));
        this.addAttribute("normal",  new BufferAttribute({name:"normal"   ,data:new Float32Array(normal) ,componentNum:3}));
        this.addAttribute("uv",         new BufferAttribute({name:"uv"          ,data:new Float32Array(uv)         ,componentNum:2}));
        this.setIndex(                       new BufferAttribute({name:"indices"   ,data:new Int16Array(indices)       ,componentNum:1}));
    }
}
