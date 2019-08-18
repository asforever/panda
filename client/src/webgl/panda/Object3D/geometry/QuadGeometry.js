import Geometry from "./Geometry";
import BufferAttribute from "./BufferAttribute";

export default class QuadGeometry extends Geometry {
    constructor(width = 2, height = 2) {
        super();
        this.width = width;
        this.height = height;
        this.init(width, height);
    }

    init(width, height) {
        this.resetSize(width, height);

        const normal = [
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

        ];
        const uv = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];
        const indices = [
            0, 1, 2, 0, 2, 3,    // front
        ];

        this.addAttribute("uv", new BufferAttribute({name: "uv", data: new Float32Array(uv), componentNum: 2}));
        this.addAttribute("normal", new BufferAttribute({
            name: "normal",
            data: new Float32Array(normal),
            componentNum: 3
        }));

        this.setIndex(new BufferAttribute({name: "indices", data: new Int16Array(indices), componentNum: 1}));
    }

    resetSize(width, height) {

        let halfWidth = width / 2 || this.width / 2;
        let halfHeight = height / 2 || this.height / 2;

        let position = [
            -halfWidth, -halfHeight, 0,
            halfWidth, -halfHeight, 0,
            halfWidth, halfHeight, 0,
            -halfWidth, halfHeight, 0
        ];

        this.addAttribute("position", new BufferAttribute({
            name: "position",
            data: new Float32Array(position),
            componentNum: 3
        }));
    }

}
