/**
 * NBTTagEnd is the special tag to define the end of NBTTagCompound
 *
 * @memberOf NBT
 * @see NBT.NBTTagCompound
 * @augments NBT.NBTBase
 * @constructor
 */
NBT.NBTTagEnd = function NBTTagEnd(){
    NBT.NBTBase.call( this, "" );
};
extend( NBT.NBTTagEnd, NBT.NBTBase );

/**
 * Type of this tag
 * @type {NBT.Type}
 */
NBT.NBTTagEnd.prototype.type = NBT.Type.TAG_END;

/**
 * Create clone of this tag
 *
 * @returns {NBT.NBTTagEnd} clone of this tag
 */
NBT.NBTTagEnd.prototype.clone = function(){
    return new NBT.NBTTagEnd();
};

/**
 * Convert this tag to string
 *
 * @returns {string}
 */
NBT.NBTTagEnd.prototype.toString = function(){
    return "";
};