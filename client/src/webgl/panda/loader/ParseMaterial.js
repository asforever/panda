export default class ParseMaterial {
    constructor() {
        this.index = 0;
        this.name = "";
        this.mtllib = "";
        this.smooth = false;
        this.groupStart = 0;
        this.groupEnd = -1;
        this.groupCount = -1;
        this.inherited = false;
    }

    clone(index) {
        let material = new ParseMaterial(this.name, this.mtllib);
        material.index = (typeof index === 'number' ? index : this.index);
        material.smooth = this.smooth;
        material.groupStart = this.groupStart;
        material.groupEnd = this.groupEnd;
        material.groupCount = this.groupCount;
        material.inherited = this.inherited;
        return material;
    }

    setIndex(index) {
        this.index = index;
    }

    setSmooth(smooth) {
        this.smooth = smooth;
    }

    setName(name) {
        this.name = name;
    }

    setMtlLib(mtllib) {
        this.mtllib = mtllib;
    }
}
