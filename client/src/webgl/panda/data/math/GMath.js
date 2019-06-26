export default class GMath {

    static DEG2RAD = Math.PI / 180;
    static RAD2DEG = 180 / Math.PI;

    static generateUUID = (function () {

        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

        let lut = [];

        for (let i = 0; i < 256; i++) {

            lut[i] = ( i < 16 ? '0' : '' ) + ( i ).toString(16);

        }

        return function generateUUID() {

            let d0 = Math.random() * 0xffffffff | 0;
            let d1 = Math.random() * 0xffffffff | 0;
            let d2 = Math.random() * 0xffffffff | 0;
            let d3 = Math.random() * 0xffffffff | 0;
            let uuid = lut[d0 & 0xff]
                + lut[(d0 >> 8) & 0xff]
                + lut[(d0 >> 16) & 0xff]
                + lut[(d0 >> 24) & 0xff] + '-'
                + lut[d1 & 0xff]
                + lut[(d1 >> 8) & 0xff] + '-'
                + lut[((d1 >> 16) & 0x0f) | 0x40]
                + lut[(d1 >> 24) & 0xff] + '-'
                + lut[(d2 & 0x3f) | 0x80]
                + lut[(d2 >> 8) & 0xff] + '-'
                + lut[(d2 >> 16) & 0xff]
                + lut[(d2 >> 24) & 0xff]
                + lut[d3 & 0xff]
                + lut[(d3 >> 8) & 0xff]
                + lut[(d3 >> 16) & 0xff]
                + lut[(d3 >> 24) & 0xff];

            // .toUpperCase() here flattens concatenated strings to save heap memory space.
            return uuid.toUpperCase();

        };

    })();

    static clamp = function (value, min, max) {

        return Math.max(min, Math.min(max, value));

    };

    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    static euclideanModulo = function (n, m) {

        return ( ( n % m ) + m ) % m;

    };

    // Linear mapping from range <a1, a2> to range <b1, b2>

    static mapLinear = function (x, a1, a2, b1, b2) {

        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

    };

    // https://en.wikipedia.org/wiki/Linear_interpolation

    static lerp = function (x, y, t) {

        return ( 1 - t ) * x + t * y;

    };

    // http://en.wikipedia.org/wiki/Smoothstep

    static smoothstep = function (x, min, max) {

        if (x <= min) return 0;
        if (x >= max) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * ( 3 - 2 * x );

    };

    static smootherstep = function (x, min, max) {

        if (x <= min) return 0;
        if (x >= max) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

    };

    // Random integer from <low, high> interval

    static randInt = function (low, high) {

        return low + Math.floor(Math.random() * ( high - low + 1 ));

    };

    // Random float from <low, high> interval

    static randFloat = function (low, high) {

        return low + Math.random() * ( high - low );

    };

    // Random float from <-range/2, range/2> interval

    static randFloatSpread = function (range) {

        return range * ( 0.5 - Math.random() );

    };

    static degToRad = function (degrees) {

        return degrees * GMath.DEG2RAD;

    };

    static radToDeg = function (radians) {

        return radians * GMath.RAD2DEG;

    };

    static isPowerOfTwo = function (value) {

        return ( value & ( value - 1 ) ) === 0 && value !== 0;

    };

    static ceilPowerOfTwo = function (value) {

        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));

    };

    static floorPowerOfTwo = function (value) {

        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));

    }

};