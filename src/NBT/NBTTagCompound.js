/**
 * NBTTagCompound represents a {key,value} storage of tags
 * @example
 * var cmp = new NBTTagCompound({}, "tagCompound");
 * cmp.put( "myByte", new NBT.NBTTagByte(10) );
 * var b = cmp.get("myByte"); // b == 10
 *
 * @memberOf NBT
 * @augments NBT.NBTBase
 * @param {Object<String,NBT.NBTBase>=} [value=""] Value of tag
 * @param {string=} [name=""] Name of tag
 * @constructor
 */
NBT.NBTTagCompound = function NBTTagCompound(value, name){
    NBT.NBTBase.call( this, name );
    /**
     * @type {Object<string,NBT.NBTBase>}
     * @private
     */
    this._value = value || {};
};
extend( NBT.NBTTagCompound, NBT.NBTBase );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagCompound
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagCompound.prototype.type = NBT.Type.TAG_COMPOUND;

/**
 * Returns tag to which the specified key is mapped
 *
 * @memberOf NBT.NBTTagCompound
 * @param {!string} key Key whose associated tag is to be returned
 * @returns {?NBT.NBTBase} Tag to which the specified key is mapped or undefined
 */
NBT.NBTTagCompound.prototype.get = function(key){
    return this._value[key];
};

/**
 * Associates tag with key in this compound
 *
 * @memberOf NBT.NBTTagCompound
 * @param {string} key Key with which tag is to be associated
 * @param {NBT.NBTBase} value Value to be associated with key
 */
NBT.NBTTagCompound.prototype.put = function(key, value){
    if (!value) {
        this.remove( key );
    } else {
        value._name = key;
        this._value[key] = value;
    }
};

/**
 * Associates new clone of tag with key in this compound
 *
 * @memberOf NBT.NBTTagCompound
 * @param {string} key Key with which tag is to be associated
 * @param {NBT.NBTBase} value Value to be associated with key
 */
NBT.NBTTagCompound.prototype.putClone = function(key, value){
    this.put( key, value && value.clone() );
};

/**
 * Removes value with the key from this compound
 *
 * @memberOf NBT.NBTTagCompound
 * @param {string} key Key is to be removed from compound
 * @returns {NBT.NBTBase} Previous tag associated with key
 */
NBT.NBTTagCompound.prototype.remove = function(key){
    var result = this._value[key];
    delete this._value[key];
    return result;
};

/**
 * Returns true if compound contains mapping for the key
 *
 * @memberOf NBT.NBTTagCompound
 * @param {string} key Key whose presence in compound is to be tested
 * @returns {boolean} True if compound contains key
 */
NBT.NBTTagCompound.prototype.containsKey = function(key){
    return this._value[key] != undefined;
};

/**
 * Removes all values from this compound
 *
 * @memberOf NBT.NBTTagCompound
 */
NBT.NBTTagCompound.prototype.clear = function(){
    this._value = {};
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagCompound
 * @returns {NBT.NBTTagCompound} Clone of this tag
 */
NBT.NBTTagCompound.prototype.clone = function(){
    var compound = new NBT.NBTTagCompound();
    var thisVal = this._value, newVal = compound._value;
    for( var key in thisVal ){
        if ( !thisVal.hasOwnProperty(key) ) continue;
        newVal[key] = thisVal[key].clone();
    }
    return compound;
};

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagCompound
 * @returns {string} String value of this tag
 */
NBT.NBTTagCompound.prototype.toString = function(){
    return "NBTTagCompound[" + this.keys.length + "]";
};

/**
 * Size of this compound
 *
 * @memberOf NBT.NBTTagCompound#
 * @name size
 * @type {number}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagCompound.prototype, "size", {
    enumerable: true,
    get: function(){
        var size = 0;
        var value = this._value;
        for ( var key in value ){
            if ( value.hasOwnProperty(key) ) size++;
        }
        return size;
    }
});

/**
 * All keys in this compound
 *
 * @memberOf NBT.NBTTagCompound#
 * @name keys
 * @type {Array<string>}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagCompound.prototype, "keys", {
    enumerable: true,
    get: function(){
        var result = [];
        var value = this._value;
        for ( var key in value ){
            if ( !value.hasOwnProperty(key) ) continue;
            result.push( key );
        }
        return result;
    }
});

/**
 * All entries of this compound as {key,value} pairs
 *
 * @memberOf NBT.NBTTagCompound#
 * @name entries
 * @type {Array<{key:string,value:NBT.NBTBase}>}
 * @readonly
 */
Object.defineProperty( NBT.NBTTagCompound.prototype, "entries", {
    enumerable: true,
    get: function(){
        var result = [];
        var value = this._value;
        for ( var key in value ){
            if ( !value.hasOwnProperty(key) ) continue;
            result.push( { key: key, value: value[key] } );
        }
        return result;
    }
});

/**
 * @virtual
 * @private
 * @param {OutputStream=} outputStream
 */
NBT.NBTTagCompound.prototype._write = function(outputStream){
    var value = this._value;
    for ( var key in value ){
        if ( !value.hasOwnProperty(key) ) continue;
        var tag = this._value[ key ];
        tag.save( outputStream, key );
    }
    outputStream.writeInt8( 0 ); // write NBTTagEnd
};