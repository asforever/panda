import Geometry from "./Geometry";
import BufferAttribute from "./BufferAttribute";
import Vector3 from "../math/vector/Vector3";

export default class SphereGeometry extends Geometry {
    constructor(radius = 1, rowSegments = 32, colSegments = 32) {
        super();
        this.radius = 10;
        this.init(radius, rowSegments, colSegments)
    }

    init(radius, rowSegments, colSegments) {

        let position = [];
        let indices = [];
        let normal = [];
        let uv = [];

        let longitude = 0;
        let latitude = -Math.PI / 2;
        let rowDelta = 2 * Math.PI / rowSegments;
        let colDelta = 2 * Math.PI / colSegments;
        let maxPositionLen = (rowSegments - 1) * colSegments + 2;

        //top point
        position.push(0, 0, radius);
        normal.push(0, 0, 1);
        uv.push(0.5,0);

        for (let row = 0; row < rowSegments; row++) {
            for (let col = 0; col < colSegments; col++) {

                let curIndex = col + 1 + (row - 1) * colSegments
                    , nIndex = (col + 1) % colSegments + curIndex - col
                    , nnIndex = nIndex + colSegments
                    , nnnIndex = curIndex + colSegments;

                if (row === 0) {
                    indices.push(0, col + 2, col + 1);
                } else if (row === rowSegments - 1) {
                    indices.push(curIndex, nIndex, maxPositionLen - 1);
                } else {
                    indices.push(curIndex, nIndex, nnIndex);
                    indices.push(curIndex, nnIndex, nnnIndex);
                }



                if (row !== 0) {
                    let x = radius * Math.cos(latitude) * Math.sin(longitude)
                        , y = radius * Math.cos(latitude) * Math.cos(longitude)
                        , z = radius * radius * Math.sin(latitude)
                        , normalVector = new Vector3(x, y, z).normalize();

                    position.push(x, y, z);
                    normal.push(normalVector.x, normalVector.y, normalVector.z);
                    uv.push(longitude / Math.PI / 2, latitude / Math.PI / 2);
                }


                longitude += colDelta;
            }
            latitude += rowDelta;
        }

        //bottom point
        position.push(0, 0, -radius);
        normal.push(0, 0, -1);
        uv.push(0.5,1);

        this.addAttribute("position", new BufferAttribute({
            name: "position",
            data: new Float32Array(position),
            componentNum: 3
        }));

        this.addAttribute("normal", new BufferAttribute({
            name: "normal",
            data: new Float32Array(normal),
            componentNum: 3
        }));
        this.addAttribute("uv", new BufferAttribute({name: "uv", data: new Float32Array(uv), componentNum: 2}));
        this.setIndex(new BufferAttribute({name: "indices", data: new Int16Array(indices), componentNum: 1}));
    }

}
