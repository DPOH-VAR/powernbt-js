/**
 * NBTTagByte represents a byte tag <br/>
 * @example
 * var a = new NBT.NBTTagByte(5, "byteTag") // returns tag 5
 * var b = new NBT.NBTTagByte("10") // returns tag 10
 * new NBT.NBTTagByte(a+b) // returns tag 15
 *
 * @memberOf NBT
 * @augments NBT.NBTNumber
 * @param {string|number|ArrayBuffer|NBT.NBTNumber=} [value=0] Value of tag
 * @param {string=} [name=""] Name of tag
 * @name NBT.NBTTagByte
 * @constructor
 */
NBT.NBTTagByte = function NBTTagByte(value, name){
    NBT.NBTNumber.call( this, 1, name );
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagByte, NBT.NBTNumber );

/**
 * Maximum numeric value of this tag
 *
 * @memberOf NBT.NBTTagByte
 * @type {number}
 */
NBT.NBTTagByte.MAX_VALUE = 127;

/**
 * Minimum numeric value of this tag
 *
 * @memberOf NBT.NBTTagByte
 * @type {number}
 */
NBT.NBTTagByte.MIN_VALUE = -128;

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagByte
 * @type {NBT.Type}
 */
NBT.NBTTagByte.prototype.type = NBT.Type.TAG_BYTE;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagByte
 * @param {number} [radix=10]
 * @returns {string} String value of this tag
 */
NBT.NBTTagByte.prototype.toString = function(radix){
    return new DataView( this._value ).getInt8( 0 ).toString( radix );
};

/**
 * Convert this tag to number
 *
 * @memberOf NBT.NBTTagByte
 * @returns {number} Numeric value of this tag
 */
NBT.NBTTagByte.prototype.valueOf = function(){
    return new DataView( this._value ).getInt8( 0 );
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagByte
 * @returns {NBT.NBTTagByte} Clone of this tag
 */
NBT.NBTTagByte.prototype.clone = function(){
    return new NBT.NBTTagByte( this._value.slice(0), this._name );
};

/**
 * Set the new value of this tag <br/>
 * If you set value as string, you can optionally specify the radix <br/>
 * Tag can take integer values from -128 to 127
 * @example
 * var tag = new NBT.NBTTagByte(-5); // tag == -5
 * tag.setValue("10"); // tag == 10
 * tag.setValue(255); // tag == -1
 * tag.setValue(-128); // tag == -128
 *
 * @memberOf NBT.NBTTagByte
 * @param {string|number|ArrayBuffer|NBT.NBTNumber} value New value of this tag
 * @param {number=} [radix=10]
 */
NBT.NBTTagByte.prototype.setValue = function(value, radix){
    if ( value instanceof ArrayBuffer ){
        if ( value.byteLength != 1 ) throw new Error('NBTTagByte: byteLength must be 1');
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
    dataView.setInt8( 0, value );
};