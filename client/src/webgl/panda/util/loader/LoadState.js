export default class LoadState {
    constructor() {
        this.srcVertices = [];
        this.srcUvs = [];
        this.srcNormals = [];

        this.vertices = [];
        this.uvs = [];
        this.normals = [];
    }

    addFace(a, b, c, ua, ub, uc, na, nb, nc) {
        let srcVertices = this.srcVertices,
            srcUvs = this.srcUvs,
            srcNormals = this.srcNormals;

        this.vertices.push(
            srcVertices[a],srcVertices[a+1],srcVertices[a+2],
            srcVertices[b],srcVertices[b+1],srcVertices[b+2],
            srcVertices[c],srcVertices[c+1],srcVertices[c+2],
        );
        this.uvs.push(
            srcUvs[ua],srcUvs[ua+1],
            srcUvs[ub],srcUvs[ub+1],
            srcUvs[uc],srcUvs[uc+1]
        );
        this.normals.push(
            srcNormals[na],srcNormals[na+1],srcNormals[na+2],
            srcNormals[nb],srcNormals[nb+1],srcNormals[nb+2],
            srcNormals[nc],srcNormals[nc+1],srcNormals[nc+2],
        )
    }


}
