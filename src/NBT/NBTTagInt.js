/**
 * NBTTagInt represents a integer (32bit) value
 * @example
 * var a = new NBT.NBTTagInt(5, "intTag") // a == 5
 * var b = new NBT.NBTTagInt("10") // b == 10
 * var c = new NBT.NBTTagInt(a-b) // c == -5
 *
 * @memberOf NBT
 * @augments NBT.NBTNumber
 * @param {string|number|ArrayBuffer|NBT.NBTNumber=} [value=0] Value of tag
 * @param {string=} [name=""] Name of tag
 * @constructor
 */
NBT.NBTTagInt = function NBTTagInt(value, name){
    NBT.NBTNumber.call( this, 4, name );
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagInt, NBT.NBTNumber );

/**
 * Maximum numeric value of this tag
 *
 * @memberOf NBT.NBTTagInt
 * @type {number}
 */
NBT.NBTTagInt.MAX_VALUE = 2147483647;

/**
 * Minimum numeric value of this tag
 *
 * @memberOf NBT.NBTTagInt
 * @type {number}
 */
NBT.NBTTagInt.MIN_VALUE = -2147483648;

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagInt
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagInt.prototype.type = NBT.Type.TAG_INT;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagInt
 * @param {number=} radix
 * @returns {string}
 */
NBT.NBTTagInt.prototype.toString = function(radix){
    return new DataView( this._value ).getInt32( 0 ).toString( radix );
};

/**
 * Convert this tag to number
 *
 * @memberOf NBT.NBTTagInt
 * @returns {number}
 */
NBT.NBTTagInt.prototype.valueOf = function(){
    return new DataView( this._value ).getInt32( 0 );
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagInt
 * @returns {NBT.NBTTagInt} Clone of this tag
 */
NBT.NBTTagInt.prototype.clone = function(){
    return new NBT.NBTTagInt( this._value.slice(0), this._name );
};

/**
 * Set the new value of this tag <br/>
 * If you set value as string, you can optionally specify the radix </br>
 * Tag can take integer values from -2147483648 to 2147483647
 * @example
 * var tag = new NBT.NBTTagInt(-5); // tag == -5
 * tag.setValue(5); // tag == 5
 * tag.setValue("10"); // tag == 10
 *
 * @memberOf NBT.NBTTagInt
 * @param {string|number|ArrayBuffer|NBT.NBTNumber} value New value of tag
 * @param {number=} radix
 */
NBT.NBTTagInt.prototype.setValue = function(value, radix){
    if ( value instanceof ArrayBuffer ){
        if ( value.byteLength != 4 ) throw new Error('NBTTagInt: byteLength must be 4');
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
    dataView.setInt32( 0, value );
};