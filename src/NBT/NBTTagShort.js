/**
 * NBTTagShort represents a short (16bit) value
 * @example
 * var a = new NBT.NBTTagShort(5, "shortTag") // a == 5 && a.name == "shortTag"
 * var b = new NBT.NBTTagShort("10") // b == 10 && b.name == ""
 * var c = new NBT.NBTTagShort(a-b) // c == -5
 *
 * @memberOf NBT
 * @augments NBT.NBTNumber
 * @param {string|number|ArrayBuffer|NBT.NBTNumber=} [value=0] Value of tag
 * @param {string=} [name=""] Name of tag
 * @constructor
 */
NBT.NBTTagShort = function NBTTagShort(value, name){
    NBT.NBTNumber.call( this, 2, name );
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagShort, NBT.NBTNumber );

/**
 * Maximum numeric value of this tag
 *
 * @memberOf NBT.NBTTagShort
 * @type {number}
 */
NBT.NBTTagShort.MAX_VALUE = 32767;

/**
 * Minimum numeric value of this tag
 *
 * @memberOf NBT.NBTTagShort
 * @type {number}
 */
NBT.NBTTagShort.MIN_VALUE = -32768;

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagShort
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagShort.prototype.type = NBT.Type.TAG_SHORT;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagShort
 * @param {number=} [radix=10]
 * @returns {string} String value of this tag
 */
NBT.NBTTagShort.prototype.toString = function( radix ){
    return new DataView( this._value ).getInt16( 0 ).toString( radix );
};

/**
 * Convert this tag to number
 *
 * @memberOf NBT.NBTTagShort
 * @returns {number}
 */
NBT.NBTTagShort.prototype.valueOf = function(){
    return new DataView( this._value ).getInt16( 0 );
};

/**
 * Create a clone of this tag
 *
 * @memberOf NBT.NBTTagShort
 * @returns {NBT.NBTTagShort}
 */
NBT.NBTTagShort.prototype.clone = function(){
    return new NBT.NBTTagShort( this._value.slice(0), this._name );
};

/**
 * Set the new value of this tag <br>
 * If you set value as string, you can optionally specify the radix <br/>
 * Tag can take integer values from -32768 to 32767
 * @example
 * var tag = new NBT.NBTTagShort(-5); // tag == -5
 * tag.setValue("10"); // tag == 10
 * tag.setValue(32768); // tag == -32767
 *
 * @memberOf NBT.NBTTagShort
 * @param {string|number|ArrayBuffer|NBT.NBTNumber} value New value of tag
 * @param {number=} [radix=10]
 */
NBT.NBTTagShort.prototype.setValue = function(value, radix){
    if ( value instanceof ArrayBuffer ){
        if ( value.byteLength != 2 ) throw new Error('NBTTagShort: byteLength must be 2');
        this._value = value;
        return;
    }
    if ( value instanceof NBT.NBTNumber ){
        value = value.valueOf();
    }
    if ( typeof value === "string" ){
        value = parseInt( value, radix );
    }
    var dataView = new DataView( this._value );
    dataView.setInt16( 0, value );
};