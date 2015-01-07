/**
 * NBTTagList represents a list of tags
 * @example
 * var list = new NBTTagList(NBT.Type.TAG_END, [], "listTag");  // list.size == 0
 * list.add( new NBTTagByte(10) ); // list.size == 1
 *
 * @memberOf NBT
 * @augments NBT.NBTBase
 * @param {!NBT.Type} type Type of entries. Use {@link NBT.Type.TAG_END} for empty lists
 * @param {Array<NBT.NBTBase>=} [value=[]] Values
 * @param {string=} [name=""] Name of tag
 * @constructor
 */
NBT.NBTTagList = function NBTTagList(type, value, name){
    /**
     * @type {NBT.Type}
     * @private
     */
    this._listType = type || NBT.Type.TAG_END;
    NBT.NBTBase.call( this, name );
    /**
     * @type {NBT.NBTBase[]}
     * @private
     */
    this._value = value || [];
};
extend( NBT.NBTTagList, NBT.NBTBase );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagList
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagList.prototype.type = NBT.Type.TAG_LIST;

/**
 * Returns tag at the specified position in this list.
 *
 * @memberOf NBT.NBTTagList
 * @param {number} index Index of tag to return
 * @returns {NBT.NBTBase} Tag at the specified position in this list
 */
NBT.NBTTagList.prototype.get = function(index){
    return this._value[ index ];
};

/**
 * Replaces tag at the specified position in this list with the specified value.
 *
 * @memberOf NBT.NBTTagList
 * @param {number} index Index of the tag to replace
 * @param {NBT.NBTBase} value Tag to be stored at the specified position
 */
NBT.NBTTagList.prototype.set = function(index, value){
    if ( this._listType == NBT.Type.TAG_END ){
        this._listType = value.type;
    } else if ( this._listType != value.type ) {
        throw new Error('NBT tag has wrong type: ' +value.type +'; expected: '+this._listType );
    }
    value._name = '';
    this._value[index] = value;
};

/**
 * Appends values to the end of this list.
 *
 * @memberOf NBT.NBTTagList
 * @param {...NBT.NBTBase} values Tags to be appended to this list
 */
NBT.NBTTagList.prototype.add = function(values){
    for ( var i=0; i<arguments.length; i++ ){
        var value = arguments[i];
        if ( this._listType == NBT.Type.TAG_END ){
            this._listType = value.type;
        } else if ( this._listType != value.type ) {
            throw new Error('NBT tag has wrong type: ' +value.type +'; expected: '+this._listType );
        }
        this._value.push( value );
    }
};

/**
 * Removes tag at the specified position in this list. Shifts any subsequent elements to the left
 *
 * @memberOf NBT.NBTTagList
 * @param {number} index Index of the element to be removed
 */
NBT.NBTTagList.prototype.remove = function(index){
    this._value.splice( index, 1 );
};

/**
 * Removes all of the elements from this list
 *
 * @memberOf NBT.NBTTagList
 */
NBT.NBTTagList.prototype.clear = function(){
    this._value.length = 0;
};

/**
 * Type of elements in this list
 *
 * @memberOf NBT.NBTTagList#
 * @name listType
 * @type {NBT.Type}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagList.prototype, "listType", {
    enumerable: true,
    get: function(){
        return this._listType;
    }
});

/**
 * Number of elements in this list
 *
 * @memberOf NBT.NBTTagList#
 * @name size
 * @type {number}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagList.prototype, "size", {
    enumerable: true,
    get: function(){
        return this._value.length;
    }
});

/**
 * All elements in this list
 *
 * @memberOf NBT.NBTTagList#
 * @name list
 * @type {NBT.NBTBase[]}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagList.prototype, "list", {
    enumerable: true,
    get: function(){
        return this._value.splice( 0 );
    }
});

/**
 * Name of list type
 *
 * @memberOf NBT.NBTTagList#
 * @name listTypeName
 * @type {string}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagList.prototype, "listTypeName", {
    enumerable: true,
    get: function(){
        return NBT.TypeName[ this.listType ];
    }
});

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagList
 * @returns {string} String value of this tag
 */
NBT.NBTTagList.prototype.toString = function(){
    return "NBTTagList[" + this._value.length + "]";
};

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTTagList.prototype._write = function(outputStream){
    outputStream.writeInt8( this._listType );
    outputStream.writeInt32( this._value.length );
    this._value.forEach(function(tag){
        tag._write( outputStream );
    });
};