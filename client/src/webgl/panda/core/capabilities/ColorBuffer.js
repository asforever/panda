import Color from "../../data/math/vector/Color";

export default class ColorBuffer {
    constructor(gl) {
        this._gl = gl;
        this.tempColor = new Color();
        this.currentMask = null;
        this.currentClear = new Color(0, 0, 0, 0);
    }


    setMask(colorMask) {

        if (this.currentMask !== colorMask) {

            this._gl.colorMask(colorMask, colorMask, colorMask, colorMask);
            this.currentMask = colorMask;

        }

    }


    setClear(r, g, b, a, premultipliedAlpha) {

        if (premultipliedAlpha === true) {

            r *= a;
            g *= a;
            b *= a;

        }

        this.tempColor.set(r, g, b, a);

        if (this.currentClear.equals(this.tempColor) === false) {

            this._gl.clearColor(r, g, b, a);
            this.currentClear.copy(this.tempColor);

        }

    }

    reset() {
        this.currentColorMask = null;
        this.currentClear.set(-1, 0, 0, 0);
    }

}