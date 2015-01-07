/**
 * NBTTagString represents a UTF-8 string
 * @example
 * var a = new NBT.NBTTagString("Hello", "stringTag") // a == "Hello"
 * var b = new NBT.NBTTagString("World") // b == "World"
 * var c = new NBT.NBTTagString(a+b) // c == "HelloWorld"
 * var d = new NBT.NBTTagDouble("") // d == ""
 *
 * @memberOf NBT
 * @augments NBT.NBTBase
 * @param {string=} [value=""] Value of this tag
 * @param {string=} [name=""] Name of this tag
 * @constructor
 */
NBT.NBTTagString = function NBTTagString(value, name){
    NBT.NBTBase.call( this, name );
    /**
     * @type {ArrayBuffer}
     * @private
     */
    this._value = new ArrayBuffer(0);
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagString, NBT.NBTBase );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagString
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagString.prototype.type = NBT.Type.TAG_STRING;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagString
 * @returns {string} String value of this tag
 */
NBT.NBTTagString.prototype.toString = function(){
    var intArray = new Int8Array( this._value );
    return Utf8Utils.decode( intArray );
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagString
 * @returns {NBT.NBTTagString} Clone of this tag
 */
NBT.NBTTagString.prototype.clone = function(){
    return new NBT.NBTTagString( this._value.slice(0), this._name );
};

/**
 * Set the new value of this tag
 *
 * @memberOf NBT.NBTTagString
 * @param {ArrayBuffer|string=} [value=""] New value of this tag
 */
NBT.NBTTagString.prototype.setValue = function(value){
    if ( value instanceof ArrayBuffer ){
        this._value = value;
        return;
    }
    var array = Utf8Utils.encode( value + "" );
    this._value = new ArrayBuffer( array.length );
    var dataView = new DataView( this._value );
    for ( var i=0; i<array.length; i++ ){
        dataView.setInt8( i, array[i] );
    }
};

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTTagString.prototype._write = function(outputStream){
    outputStream.writeInt16( this._value.byteLength );
    outputStream.write( this._value );
};