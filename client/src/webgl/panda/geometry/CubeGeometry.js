import Geometry from "./Geometry";
import BufferAttribute from "./BufferAttribute";

export default class CubeGeometry extends Geometry {
    constructor(length = 2, width = 2, height = 2) {
        super();
        this.length = length;
        this.width = width;
        this.height = height;
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

        this.addAttribute("uv", new BufferAttribute({name: "uv", data: new Float32Array(uv), componentNum: 2}));
        this.addAttribute("normal", new BufferAttribute({
            name: "normal",
            data: new Float32Array(normal),
            componentNum: 3
        }));

        this.setIndex(new BufferAttribute({name: "indices", data: new Int16Array(indices), componentNum: 1}));
    }

    resetSize(length, width, height) {
        let halfLength = length / 2 || this.length / 2;
        let halfWidth = width / 2 || this.width / 2;
        let halfHeight = height / 2 || this.height / 2;

        let LBF = [-halfWidth, -halfHeight, halfLength];//左下前
        let RBF = [halfWidth, -halfHeight, halfLength]; //右下前
        let RTF = [halfWidth, halfHeight, halfLength];  //右上前
        let LTF = [-halfWidth, halfHeight, halfLength]; //左上前

        let LBB = [-halfWidth, -halfHeight, -halfLength];//左下后
        let RBB = [halfWidth, -halfHeight, -halfLength];//右下后
        let RTB = [halfWidth, halfHeight, -halfLength];//右上后
        let LTB = [-halfWidth, halfHeight, -halfLength];//左上后


        let position = [
            ...LBF, ...RBF, ...RTF, ...LTF,      // Front face
            ...LBB, ...LTB, ...RTB, ...RBB,     // Back face
            ...LTF, ...RTF, ...RTB, ...LTB,     // Top face
            ...LBF, ...LBB, ...RBB, ...RBF,     // Bottom face
            ...RBF, ...RBB, ...RTB, ...RTF,     // Right face
            ...LBF, ...LTF, ...LTB, ...LBB,     // Left face
        ];

        this.addAttribute("position", new BufferAttribute({
            name: "position",
            data: new Float32Array(position),
            componentNum: 3
        }));
    }

}
