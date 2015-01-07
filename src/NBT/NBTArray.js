/**
 * NBTArray is abstract class for nbt arrays
 * @see NBT.NBTTagByteArray
 * @see NBT.NBTTagIntArray
 *
 * @memberOf NBT
 * @augments NBT.NBTBase
 * @param {string=} name
 * @property {ArrayBuffer} NBT.NBTArray#_value
 * @property {number} NBT.NBTArray#size
 * @constructor
 */
NBT.NBTArray = function(name){
    if ( this.constructor == NBT.NBTArray ) throw new Error( "NBTArray is abstract" );
    NBT.NBTBase.call( this, name );
};
extend( NBT.NBTArray, NBT.NBTBase );

/**
 * Convert this tag to numeric array
 *
 * @memberOf NBT.NBTArray
 * @returns {number[]}
 */
NBT.NBTArray.prototype.toArray = function(){
    var result = [];
    for ( var i=0; i<this.size; i++ ){
        result.push( this.get(i) );
    }
    return result;
};