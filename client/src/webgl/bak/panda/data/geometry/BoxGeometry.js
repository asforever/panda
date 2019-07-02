import Geometry from "./Geometry";
import BufferAttribute from "./BufferAttribute";

export default class BoxGeometry extends Geometry {
    constructor(length = 2, width = 2, height = 2) {
        super();
        this.init(length, width, height);
    }

    init(length, width, height) {
        this.resetSize(length, width, height);

        const normal = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,

            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,

            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            // Left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
        ];
        const uv = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];
        const indices = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23,   // left
        ];

        this.addAttribute("normal", new BufferAttribute({
            name: "normal",
            data: new Float32Array(normal),
            componentNum: 3
        }));
        this.addAttribute("uv", new BufferAttribute({name: "uv", data: new Float32Array(uv), componentNum: 2}));
        this.setIndex(new BufferAttribute({name: "indices", data: new Int16Array(indices), componentNum: 1}));
    }

    resetSize(length = 3, width = 3, height = 3) {
        let halfLength = length / 2;
        let halfWidth = width / 2;
        let halfHeight = height / 2;

        let FBL = [-halfWidth, -halfHeight, halfLength];
        let FBR = [halfWidth, -halfHeight, halfLength];
        let FTR = [halfWidth, halfHeight, halfLength];
        let FTL = [-halfWidth, halfHeight, halfLength];

        let BBL = [-halfWidth, -halfHeight, -halfLength];
        let BBR = [-halfWidth, halfHeight, -halfLength];
        let BTR = [halfWidth, halfHeight, -halfLength];
        let BTL = [halfWidth, -halfHeight, -halfLength];


        let position = [
            ...FBL, ...FBR, ...FTR, ...FTL,      // Front face
            ...BBL, ...BBR, ...BTR, ...BTL,     // Back face
            ...BBR, ...FTL, ...FTR, ...BTR,     // Top face
            ...BBL, ...BTL, ...FBR, ...FBL,     // Bottom face
            ...BTL, ...BTR, ...FTR, ...FBR,     // Right face
            ...BBL, ...FBL, ...FTL, ...BBR,     // Left face
        ];

        this.addAttribute("position", new BufferAttribute({
            name: "position",
            data: new Float32Array(position),
            componentNum: 3
        }));
    }

}
