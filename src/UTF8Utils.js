'use strict';
var Utf8Utils = {
    /**
     * Encode javascript string as utf8 byte array
     */
    encode: function (stringToEncode) {
        stringToEncode = stringToEncode.replace(/\r\n/g,"\n");
        var result = [];
        for (var n = 0; n < stringToEncode.length; n++) {
            var c = stringToEncode.charCodeAt(n);
            if (c < 128) {
                result[result.length] = c;
            }
            else if((c > 127) && (c < 2048)) {
                result[result.length]= (c >> 6) | 192;
                result[result.length]= (c & 63) | 128;
            }
            else {
                result[result.length]= (c >> 12) | 224;
                result[result.length]= ((c >> 6) & 63) | 128;
                result[result.length]= (c & 63) | 128;
            }

        }
        return result;
    },

    /**
     * Decode utf8 byte array to javascript string....
     */
    decode: function (byteData) {
        var length = byteData.length || byteData.byteLength;
        var result = "";
        var i = 0;
        var c = 0, c2 = 0, c3 = 0;
        while (i < length) {
            c = byteData[i] & 0xff;
            if (c < 128) {
                result += String.fromCharCode( c );
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = byteData[i + 1] & 0xff;
                result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = byteData[i + 1] & 0xff;
                c3 = byteData[i + 2] & 0xff;
                result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return result;
    }
};