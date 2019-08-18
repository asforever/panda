import ParseGeometry from "./ParseGeometry";
import ParseMaterial from "./ParseMaterial";

export default class ParseObject {
    constructor() {
        this.name = '';
        this.geometry = new ParseGeometry();
        this.materials = [];
        this.smooth = true;
    }

    startMaterial(name, libraries) {
        let previous = this._finalize(false);
        if (previous && (previous.inherited || previous.groupCount <= 0)) {

            this.materials.splice(previous.index, 1);

        }

        let material = new ParseMaterial();
        material.setIndex(this.materials.length);
        material.setName(name || "");
        material.setMtlLib((Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : ''));
        material.setSmooth(previous !== undefined ? previous.smooth : this.smooth);
        material.groupStart = (previous !== undefined ? previous.groupEnd : 0);
        this.materials.push(material);
        return material;
    }

    currentMaterial() {

        if (this.materials.length > 0) {

            return this.materials[this.materials.length - 1];

        }

        return undefined;

    }

    _finalize(end) {

        let lastMultiMaterial = this.currentMaterial();
        if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {

            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
            lastMultiMaterial.inherited = false;

        }
        // Ignore objects tail materials if no face declarations followed them before a new o/g started.
        if (end && this.materials.length > 1) {

            for (let mi = this.materials.length - 1; mi >= 0; mi--) {

                if (this.materials[mi].groupCount <= 0) {

                    this.materials.splice(mi, 1);

                }

            }

        }

        // Guarantee at least one empty material, this makes the creation later more straight forward.
        if (end && this.materials.length === 0) {

            let material = new ParseMaterial();
            material.setSmooth(this.smooth);
            this.materials.push(material);
        }

        return lastMultiMaterial;
    }

    setName(name) {
        this.name = name || "";
    }

}
