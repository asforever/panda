import FileLoader from "./FileLoader";
import LoadState from "./LoadState";
import MeshInfo from "./MeshInfo";

export default class OBJLoader {
    async load(url) {
        let fileLoad = new FileLoader();
        let repose = await fileLoad.load(url, undefined, FileLoader.TEXT);
        return this.parse(repose);
    }

    parse(text) {
        // o object_name | g group_name
        let object_pattern = /^[og]\s*(.+)?/;
        // mtllib file_reference
        let material_library_pattern = /^mtllib /;
        // usemtl material_name
        let material_use_pattern = /^usemtl /;

        if (text.indexOf('\r\n') !== -1) {
            // This is faster than String.split with regex that splits on both
            text = text.replace(/\r\n/g, '\n');
        }

        if (text.indexOf('\\\n') !== -1) {
            // join lines separated by a line continuation character (\)
            text = text.replace(/\\\n/g, '');
        }

        let lines = text.split('\n')
            , state = new LoadState()
            , meshInfo = new MeshInfo(state)
            , meshContainer = [];

        for (let i = 0, l = lines.length; i < l; i++) {
            let line = lines[i];
            line = line.trimLeft ? line.trimLeft() : line.trim();
            let lineLength = line.length;
            if (lineLength === 0) continue;
            let lineFirstChar = line.charAt(0);
            if (lineFirstChar === '#') continue;

            let result = object_pattern.exec(line);

            if (lineFirstChar === 'v') {
                let data = line.split(/\s+/);
                switch (data[0]) {
                    case 'v':
                        state.srcVertices.push(
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
                        state.srcNormals.push(
                            parseFloat(data[1]),
                            parseFloat(data[2]),
                            parseFloat(data[3])
                        );
                        break;
                    case 'vt':
                        state.srcUvs.push(
                            parseFloat(data[1]),
                            parseFloat(data[2])
                        );
                        break;
                    default:
                        break;
                }
            } else if (lineFirstChar === 'f') {
                //面
                let lineData = line.substr(1).trim();
                let vertexData = lineData.split(/\s+/);
                let faceVertices = [];
                for (let j = 0, jl = vertexData.length; j < jl; j++) {

                    let vertex = vertexData[j];

                    if (vertex.length > 0) {

                        let vertexParts = vertex.split('/');
                        faceVertices.push(vertexParts);

                    }

                }
                let v1 = faceVertices[0];

                for (let j = 1, jl = faceVertices.length - 1; j < jl; j++) {

                    let v2 = faceVertices[j];
                    let v3 = faceVertices[j + 1];
                    //v indices , uvs indices ,normal indices
                    meshInfo.addFace(
                        parseInt(v1[0]), parseInt(v2[0]), parseInt(v3[0]),
                        parseInt(v1[1]), parseInt(v2[1]), parseInt(v3[1]),
                        parseInt(v1[2]), parseInt(v2[2]), parseInt(v3[2])
                    );

                }

            } else if (lineFirstChar === 'l') {
                //线
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
            } else if (lineFirstChar === 'p') {
                //let lineData = line.substr(1).trim();
                //let pointData = lineData.split(" ");
            } else if (result !== null) {
                //组
                let name = (" " + result[0].substr(1).trim()).substr(1);
                meshInfo = new MeshInfo(state);
                meshInfo.name = name;
                meshContainer.push(meshInfo);

            } else if (material_use_pattern.test(line)) {
            } else if (material_library_pattern.test(line)) {
            } else if (lineFirstChar === 's') {
                //result = line.split(' ');
                //if (result.length > 1) {
                //    let value = result[1].trim().toLowerCase();
                //}
            } else {

                // Handle null terminated files without exception
                if (line === '\0') continue;

                throw new Error('OBJLoader: Unexpected line: "' + line + '"');

            }
        }
        let resultContainer = [];
        meshContainer.forEach(meshInfo => {
            if (meshInfo.vertices.length > 0) {
                resultContainer.push(meshInfo);
            }
        });
        return resultContainer;
    }
}
