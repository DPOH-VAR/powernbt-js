/**
 * NBTNumber is abstract class for numeric tags
 * @see NBT.NBTTagByte
 * @see NBT.NBTTagShort
 * @see NBT.NBTTagInt
 * @see NBT.NBTTagLong
 * @see NBT.NBTTagFloat
 * @see NBT.NBTTagDouble
 *
 * @memberOf NBT
 * @virtual
 * @augments NBT.NBTBase
 * @param {number} bufferSize byte length of tag
 * @param {string=} [name=""] name of tag
 * @constructor
 */
NBT.NBTNumber = function NBTNumber(bufferSize, name){
    if ( this.constructor == NBT.NBTNumber ) throw new Error( "NBTNumber is abstract" );
    NBT.NBTBase.call( this, name );
    /**
     * @type {ArrayBuffer}
     * @private
     */
    this._value = new ArrayBuffer( bufferSize );
};
extend( NBT.NBTNumber, NBT.NBTBase );

/**
 * Convert this tag to number
 *
 * @virtual
 * @memberOf NBT.NBTNumber
 * @returns {number} Numeric value of this tag
 */
NBT.NBTNumber.prototype.valueOf = function(){};

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTNumber.prototype._write = function(outputStream){
    outputStream.write( this._value );
};