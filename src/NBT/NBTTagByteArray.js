/**
 * NBTTagByteArray represents a bytes storage
 * @example
 * var bb1 = new NBTTagByteArray([1,2,3,10], "tagBytes");
 * bb1.size; // 4
 * var bb2 = new NBTTagByteArray();
 * bb2.size; // 0
 *
 * @memberOf NBT
 * @augments NBT.NBTArray
 * @param {Array<number>|ArrayBuffer|String=} value Value of tag
 * @param {string=} name Name of tag
 * @constructor
 */
NBT.NBTTagByteArray = function NBTTagByteArray(value, name){
    NBT.NBTArray.call( this, name );
    this.setValue( value );
};
extend( NBT.NBTTagByteArray, NBT.NBTArray );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagByteArray
 * @type {NBT.Type}
 */
NBT.NBTTagByteArray.prototype.type = NBT.Type.TAG_BYTE_ARRAY;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagByteArray
 * @returns {string} String value of this tag
 */
NBT.NBTTagByteArray.prototype.toString = function(){
    return "NBTTagByteArray["+this._value.byteLength+"]";
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagByteArray
 * @returns {NBT.NBTTagByteArray} Clone of this tag
 */
NBT.NBTTagByteArray.prototype.clone = function(){
    return new NBT.NBTTagByteArray( this._value.slice(0), this._name );
};

/**
 * Set new value of this tag
 *
 * @memberOf NBT.NBTTagByteArray
 * @param {ArrayBuffer|Array<number>|string} value New value of this tag
 */
NBT.NBTTagByteArray.prototype.setValue = function(value){
    if ( value == null) {
        this._value = new ArrayBuffer( 0 );
        return;
    } else if ( value instanceof ArrayBuffer ){
        this._value = value;
        return;
    } else if ( typeof value === "string" ){
        value = Utf8Utils.encode( value );
    }
    var length = value.length || value.byteLength;
    this._value = new ArrayBuffer( length );
    var dataView = new DataView( this._value );
    for ( var i=0; i<length; i++ ){
        dataView.setInt8( i, value[i] )
    }
};

/**
 * Get byte at specified position in this array
 *
 * @memberOf NBT.NBTTagByteArray
 * @param {!number} index Index of byte to return
 * @returns {number} Byte value at the specified position in this array
 */
NBT.NBTTagByteArray.prototype.get = function(index){
    var dataView = new DataView( this._value );
    return dataView.getInt8( index );
};

/**
 * Set new byte in array at specified position
 *
 * @memberOf NBT.NBTTagByteArray
 * @param {number} index Index of byte to replace
 * @param {number} value Byte to be stored at specified position
 */
NBT.NBTTagByteArray.prototype.set = function(index, value){
    var dataView = new DataView( this._value );
    dataView.setInt8( index, value );
};

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTTagByteArray.prototype._write = function(outputStream){
    outputStream.writeInt32( this._value.byteLength );
    outputStream.write( this._value );
};

/**
 * Number of bytes in this array
 *
 * @memberOf NBT.NBTTagByteArray#
 * @name size
 * @type {number}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagByteArray.prototype, "size", {
    enumerable: true,
    get: function(){
        return this._value.byteLength;
    }
});