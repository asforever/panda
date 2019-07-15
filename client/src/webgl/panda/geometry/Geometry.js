import GMath from "../math/GMath"

export default class Geometry {
    constructor() {
        this.UUID = GMath.generateUUID();
        this.needsUpdate = true;
        this.attributes = {};//Array<AttributeBuffer>
        this.attributesCode = 7;
        this.indices = null;//AttributeBuffer
    }

    addAttribute(name, attribute) {
        this.attributes[name] = attribute;
        this.needsUpdate = true;
    }

    setIndex(attribute) {
        this.indices = attribute;
        this.needsUpdate = true;
    }

}
