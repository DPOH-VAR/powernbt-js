/**
 * @memberOf NBT~
 * @param {ArrayBuffer|Int8Array|Uint8Array} buffer
 * @constructor
 */
function InputStream(buffer){
    /**
     * @private
     * @type {ArrayBuffer}
     */
    this._buffer = buffer.buffer || buffer;
    /**
     *
     * @type {number}
     * @private
     */
    this._offset = 0;
}

/**
 * @param {number} length
 * @returns {ArrayBuffer}
 * @memberOf NBT~InputStream#
 */
InputStream.prototype.read = function(length){
    var data = this._buffer.slice( this._offset, this._offset+length );
    this._offset += length;
    return data;
};

/**
 * @returns {number}
 * @memberOf NBT~InputStream#
 */
InputStream.prototype.readInt8 = function(){
    var data = new DataView( this._buffer ).getInt8( this._offset );
    this._offset += 1;
    return data;
};

/**
 * @returns {number}
 * @memberOf NBT~InputStream#
 */
InputStream.prototype.readInt16 = function(){
    var data = new DataView( this._buffer ).getInt16( this._offset );
    this._offset += 2;
    return data;
};

/**
 * @returns {number}
 * @memberOf NBT~InputStream#
 */
InputStream.prototype.readInt32 = function(){
    var data = new DataView( this._buffer ).getInt32( this._offset );
    this._offset += 4;
    return data;
};