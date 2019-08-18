import ParseObject from "./ParseObject";

export default class ParserState {
    constructor(){
        this.objects = [];
        this.object = [];
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.materialLibraries = [];
    }

    startObject (name, fromDeclaration) {

        // If the current object (initial from reset) is not from a g/o declaration in the parsed
        // file. We need to use it for the first parsed g/o to keep things in sync.
        if (this.object && this.object.fromDeclaration === false) {

            this.object.name = name;
            this.object.fromDeclaration = (fromDeclaration !== false);
            return;

        }

        let previousMaterial = (this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined);

        if (this.object && typeof this.object._finalize === 'function') {

            this.object._finalize(true);

        }

        this.object = new ParseObject();
        this.object.setName(name);
        // Inherit previous objects material.
        // Spec tells us that a declared material must be set to all objects until a new material is declared.
        // If a usemtl declaration is encountered while this new object is being parsed, it will
        // overwrite the inherited material. Exception being that there was already face declarations
        // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

        if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {

            let declared = previousMaterial.clone(0);
            declared.inherited = true;
            this.object.materials.push(declared);

        }

        this.objects.push(this.object);

    }

    finalize () {

        if (this.object && typeof this.object._finalize === 'function') {

            this.object._finalize(true);

        }

    }

    parseVertexIndex (value, len) {

        let index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;

    }

    parseNormalIndex (value, len) {

        let index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;

    }

    parseUVIndex (value, len) {

        let index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 2) * 2;

    }

    addVertex (a, b, c) {

        let src = this.vertices;
        let dst = this.object.geometry.vertices;

        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);

    }

    addVertexPoint (a) {

        let src = this.vertices;
        let dst = this.object.geometry.vertices;

        dst.push(src[a + 0], src[a + 1], src[a + 2]);

    }

    addVertexLine (a) {

        let src = this.vertices;
        let dst = this.object.geometry.vertices;

        dst.push(src[a + 0], src[a + 1], src[a + 2]);

    }

    addNormal (a, b, c) {

        let src = this.normals;
        let dst = this.object.geometry.normals;

        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);

    }

    addColor (a, b, c) {

        let src = this.colors;
        let dst = this.object.geometry.colors;

        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);

    }

    addUV (a, b, c) {

        let src = this.uvs;
        let dst = this.object.geometry.uvs;

        dst.push(src[a + 0], src[a + 1]);
        dst.push(src[b + 0], src[b + 1]);
        dst.push(src[c + 0], src[c + 1]);

    }

    addUVLine (a) {

        let src = this.uvs;
        let dst = this.object.geometry.uvs;

        dst.push(src[a + 0], src[a + 1]);

    }

    addFace (a, b, c, ua, ub, uc, na, nb, nc) {

        let vLen = this.vertices.length;

        let ia = this.parseVertexIndex(a, vLen);
        let ib = this.parseVertexIndex(b, vLen);
        let ic = this.parseVertexIndex(c, vLen);

        this.addVertex(ia, ib, ic);

        if (ua !== undefined && ua !== '') {

            let uvLen = this.uvs.length;
            ia = this.parseUVIndex(ua, uvLen);
            ib = this.parseUVIndex(ub, uvLen);
            ic = this.parseUVIndex(uc, uvLen);
            this.addUV(ia, ib, ic);

        }

        if (na !== undefined && na !== '') {

            // Normals are many times the same. If so, skip function call and parseInt.
            let nLen = this.normals.length;
            ia = this.parseNormalIndex(na, nLen);

            ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
            ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);

            this.addNormal(ia, ib, ic);

        }

        if (this.colors.length > 0) {

            this.addColor(ia, ib, ic);

        }

    }

    addPointGeometry (vertices) {

        this.object.geometry.type = 'Points';

        let vLen = this.vertices.length;

        for (let vi = 0, l = vertices.length; vi < l; vi++) {

            this.addVertexPoint(this.parseVertexIndex(vertices[vi], vLen));

        }

    }

    addLineGeometry (vertices, uvs) {

        this.object.geometry.type = 'Line';

        let vLen = this.vertices.length;
        let uvLen = this.uvs.length;

        for (let vi = 0, l = vertices.length; vi < l; vi++) {

            this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));

        }

        for (let uvi = 0, l = uvs.length; uvi < l; uvi++) {

            this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));

        }

    }

}
