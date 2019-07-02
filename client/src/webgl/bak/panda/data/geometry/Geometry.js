import GMath from "../math/GMath"

export default class Geometry {
    constructor() {
        this.UUID = GMath.generateUUID();
        this.needsUpdate = true;
        this.attributes = {};//Array<AttributeBuffer>
        this.indices = null;//AttributeBuffer
    }

    addAttribute(name, attribute) {
        this.needsUpdate = true;
        this.attributes[name] = attribute;
    }

    setIndex(attribute) {
        this.needsUpdate = true;
        this.indices = attribute;
    }
}
