/**
 * NBTTagIntArray represents a integers storage
 * @example
 * var intArr1 = new NBTTagIntArray([-200,1000], "tagInts");
 * intArr1.size; // 2
 * var intArr2 = new NBTTagIntArray();
 * intArr2.size; // 0
 *
 * @memberOf NBT
 * @augments NBT.NBTArray
 * @param {string=} name
 * @param value
 * @constructor
 */
NBT.NBTTagIntArray = function NBTTagIntArray(value, name){
    NBT.NBTArray.call( this, name );
    this.setValue( value );
};
extend( NBT.NBTTagIntArray, NBT.NBTArray );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagIntArray
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagIntArray.prototype.type = NBT.Type.TAG_INT_ARRAY;
NBT.NBTTagIntArray.prototype.toString = function(){
    return "NBTTagIntArray[" + Math.round(this._value.byteLength/4) + "]";
};

/**
 * Create clone of this tag
 *
 * NBT.NBTTagIntArray
 * @returns {NBT.NBTTagIntArray} Clone of this tag
 */
NBT.NBTTagIntArray.prototype.clone = function(){
    return new NBT.NBTTagIntArray( this._value.slice(0), this._name );
};

/**
 * Set new value of this tag
 *
 * @memberOf NBT.NBTTagIntArray
 * @param {ArrayBuffer|Array<number>|string} value New value of this tag
 */
NBT.NBTTagIntArray.prototype.setValue = function(value){
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
    this._value = new ArrayBuffer( length*4 );
    var dataView = new DataView( this._value );
    for ( var i=0; i<length; i++ ){
        dataView.setInt32( i*4, value[i] );
    }
};

/**
 * Get integer at specified position in this array
 *
 * @memberOf NBT.NBTTagIntArray
 * @param {!number} index Index of integer to return
 * @returns {number} Integer value at the specified position in this array
 */
NBT.NBTTagIntArray.prototype.get = function(index){
    var dataView = new DataView( this._value );
    return dataView.getInt32( index*4 );
};

/**
 * Set new integer in array at specified position
 *
 * @memberOf NBT.NBTTagIntArray
 * @param {number} index Index of byte to replace
 * @param {number} value Integer to be stored at specified position
 */
NBT.NBTTagIntArray.prototype.set = function(index, value){
    var dataView = new DataView( this._value );
    dataView.setInt32( index*4, value );
};

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTTagIntArray.prototype._write = function(outputStream){
    outputStream.writeInt32( this._value.byteLength / 4 );
    outputStream.write( this._value );
};

/**
 * Number of integers in this array
 *
 * @memberOf NBT.NBTTagIntArray#
 * @name size
 * @type {number}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagIntArray.prototype, "size", {
    enumerable: true,
    get: function(){
        return this._value.byteLength/4;
    }
});