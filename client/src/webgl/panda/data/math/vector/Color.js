export default class Color {
    constructor(r = 1, b = 1, g = 1, a = 1) {
        this.r = r;
        this.b = b;
        this.g = g;
        this.a = a;
    }

    toArray(array, offset) {

        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        array[offset + 3] = this.a;

        return array;

    }

    toArray3(array, offset) {

        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;

        return array;

    }

    setRGB(r, g, b) {

        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }

    setRGBA(r, g, b, a) {

        this.setRGB(r, g, b);
        this.a = a;
        return this;
    }

    equals(c) {
        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b) && (c.a === this.a);
    }
}