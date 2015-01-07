/**
 * NBTBase is abstract class for NBT tags
 * @see NBT.NBTTagEnd
 * @see NBT.NBTTagByte
 * @see NBT.NBTTagShort
 * @see NBT.NBTTagInt
 * @see NBT.NBTTagLong
 * @see NBT.NBTTagFloat
 * @see NBT.NBTTagDouble
 * @see NBT.NBTTagByteArray
 * @see NBT.NBTTagString
 * @see NBT.NBTTagList
 * @see NBT.NBTTagCompound
 * @see NBT.NBTTagIntArray
 *
 * @virtual
 * @param {string=} [name=""] name of NBT tag
 * @memberOf NBT
 * @constructor
 */
NBT.NBTBase = function NBTBase(name){
    if ( this.constructor == NBT.NBTBase ) throw new Error( "NBTBase is abstract" );
    /**
     * @type {string}
     * @protected
     */
    this._name = ( name || '' ) + '';
};

/**
 * Name of this tag
 * @memberOf NBT.NBTBase#
 * @name name
 * @readonly
 * @type {string}
 */
Object.defineProperty( NBT.NBTBase.prototype, "name", {
    enumerable: true,
    get: function(){
        return this._name;
    }
});

/**
 * Type of this tag
 *
 * @abstract
 * @memberOf NBT.NBTBase#
 * @name type
 * @readonly
 * @type {NBT.Type}
 */
NBT.NBTBase.prototype.type = null;

/**
 * Create clone of this tag
 *
 * @virtual
 * @memberOf NBT.NBTBase
 * @returns {NBT.NBTBase} Clone of this tag
 */
NBT.NBTBase.prototype.clone = function(){};

/**
 * Convert this tag to string
 *
 * @virtual
 * @memberOf NBT.NBTBase
 * @returns {string} String value of this tag
 */
NBT.NBTBase.prototype.toString = function(){};

/**
 * Save this tag to OutputStream
 * @example
 * var tag = new NBT.NBTTagByteArray([2,3,5,7,11]);
 * var arrayBuffer = tag.save().toArrayBuffer(); // save as ArrayBuffer
 * var blob = tag.save().toBlob(); // save as Blob
 *
 * @memberOf NBT.NBTBase
 * @param {NBT~OutputStream=} outputStream Output stream to save tag
 * @param {string=} name Use custom name to save this tag
 * @returns {NBT~OutputStream} passed output stream
 */
NBT.NBTBase.prototype.save = function( outputStream, name ){
    if ( outputStream == null ) outputStream = new OutputStream();
    outputStream.writeInt8( this.type );
    if ( this.type == NBT.Type.TAG_END ) return outputStream;
    outputStream.writeUtf8String( name==null ? this.name : name );
    this._write( outputStream );
    return outputStream;
};

/**
 * Name of tag type
 *
 * @memberOf NBT.NBTBase#
 * @name typeName
 * @type {string}
 * @readonly
 */
Object.defineProperty( NBT.NBTBase.prototype, "typeName", {
    enumerable: true,
    get: function(){
        return NBT.TypeName[ this.type ];
    }
});

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTBase.prototype._write = function(outputStream){};
