import FileLoader from "./FileLoader";
import ParseState from "./ParseState";

// o object_name | g group_name
let object_pattern = /^[og]\s*(.+)?/;
// mtllib file_reference
let material_library_pattern = /^mtllib /;
// usemtl material_name
let material_use_pattern = /^usemtl /;


export default class OBJLoader {

    async load(url) {
        let fileLoad = new FileLoader();
        let repose = await fileLoad.load(url, undefined, FileLoader.TEXT);
        return this.parse(repose);
    }

    setMaterials(materials) {

        this.materials = materials;

        return this;

    }

    parse(text) {

        console.time('OBJLoader');

        let state = new ParseState();
        state.startObject('', false);

        if (text.indexOf('\r\n') !== -1) {

            // This is faster than String.split with regex that splits on both
            text = text.replace(/\r\n/g, '\n');

        }

        if (text.indexOf('\\\n') !== -1) {

            // join lines separated by a line continuation character (\)
            text = text.replace(/\\\n/g, '');

        }

        let lines = text.split('\n');
        let line = '', lineFirstChar = '';
        let lineLength = 0;
        let result = [];

        // Faster to just trim left side of the line. Use if available.
        let trimLeft = (typeof ''.trimLeft === 'function');

        for (let i = 0, l = lines.length; i < l; i++) {

            line = lines[i];

            line = trimLeft ? line.trimLeft() : line.trim();

            lineLength = line.length;

            if (lineLength === 0) continue;

            lineFirstChar = line.charAt(0);

            // @todo invoke passed in handler if any
            if (lineFirstChar === '#') continue;

            if (lineFirstChar === 'v') {

                let data = line.split(/\s+/);

                switch (data[0]) {

                    case 'v':
                        state.vertices.push(
                            parseFloat(data[1]),
                            parseFloat(data[2]),
                            parseFloat(data[3])
                        );
                        if (data.length === 8) {

                            state.colors.push(
                                parseFloat(data[4]),
                                parseFloat(data[5]),
                                parseFloat(data[6])
                            );

                        }
                        break;
                    case 'vn':
                        state.normals.push(
                            parseFloat(data[1]),
                            parseFloat(data[2]),
                            parseFloat(data[3])
                        );
                        break;
                    case 'vt':
                        state.uvs.push(
                            parseFloat(data[1]),
                            parseFloat(data[2])
                        );
                        break;
                    default:
                        break;

                }

            } else if (lineFirstChar === 'f') {

                let lineData = line.substr(1).trim();
                let vertexData = lineData.split(/\s+/);
                let faceVertices = [];

                // Parse the face vertex data into an easy to work with format

                for (let j = 0, jl = vertexData.length; j < jl; j++) {

                    let vertex = vertexData[j];

                    if (vertex.length > 0) {

                        let vertexParts = vertex.split('/');
                        faceVertices.push(vertexParts);

                    }

                }

                // Draw an edge between the first vertex and all subsequent vertices to form an n-gon

                let v1 = faceVertices[0];

                for (let j = 1, jl = faceVertices.length - 1; j < jl; j++) {

                    let v2 = faceVertices[j];
                    let v3 = faceVertices[j + 1];

                    state.addFace(
                        v1[0], v2[0], v3[0],
                        v1[1], v2[1], v3[1],
                        v1[2], v2[2], v3[2]
                    );

                }

            } else if (lineFirstChar === 'l') {

                let lineParts = line.substring(1).trim().split(" ");
                let lineVertices = [], lineUVs = [];

                if (line.indexOf("/") === -1) {

                    lineVertices = lineParts;

                } else {

                    for (let li = 0, llen = lineParts.length; li < llen; li++) {

                        let parts = lineParts[li].split("/");

                        if (parts[0] !== "") lineVertices.push(parts[0]);
                        if (parts[1] !== "") lineUVs.push(parts[1]);

                    }

                }
                state.addLineGeometry(lineVertices, lineUVs);

            } else if (lineFirstChar === 'p') {

                let lineData = line.substr(1).trim();
                let pointData = lineData.split(" ");

                state.addPointGeometry(pointData);

            } else if ((result = object_pattern.exec(line)) !== null) {

                // o object_name
                // or
                // g group_name

                // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
                // let name = result[ 0 ].substr( 1 ).trim();
                let name = (" " + result[0].substr(1).trim()).substr(1);

                state.startObject(name);

            } else if (material_use_pattern.test(line)) {

                // material

                state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);

            } else if (material_library_pattern.test(line)) {

                // mtl file

                state.materialLibraries.push(line.substring(7).trim());

            } else if (lineFirstChar === 's') {

                result = line.split(' ');

                // smooth shading

                // @todo Handle files that have varying smooth values for a set of faces inside one geometry,
                // but does not define a usemtl for each face set.
                // This should be detected and a dummy material created (later MultiMaterial and geometry groups).
                // This requires some care to not create extra material on each smooth value for "normal" obj files.
                // where explicit usemtl defines geometry groups.
                // Example asset: examples/models/obj/cerberus/Cerberus.obj

                /*
                 * http://paulbourke.net/dataformats/obj/
                 * or
                 * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
                 *
                 * From chapter "Grouping" Syntax explanation "s group_number":
                 * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
                 * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
                 * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
                 * than 0."
                 */
                if (result.length > 1) {

                    let value = result[1].trim().toLowerCase();
                    state.object.smooth = (value !== '0' && value !== 'off');

                } else {

                    // ZBrush can produce "s" lines #11707
                    state.object.smooth = true;

                }
                let material = state.object.currentMaterial();
                if (material) material.smooth = state.object.smooth;

            } else {

                // Handle null terminated files without exception
                if (line === '\0') continue;

                throw new Error('THREE.OBJLoader: Unexpected line: "' + line + '"');

            }

        }

        state.finalize();
        return state;

    }
}


