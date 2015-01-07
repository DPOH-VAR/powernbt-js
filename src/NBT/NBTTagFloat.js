/**
 * NBTTagFloat represents a float (32bit) value
 * @example
 * var a = new NBT.NBTTagFloat(5.25, "floatTag") // a == 5.25
 * var b = new NBT.NBTTagFloat("-10.5")// b == -10.5
 * var c = new NBT.NBTTagFloat(a+b) // c == -5.25
 *
 * @memberOf NBT
 * @augments NBT.NBTNumber
 * @param {string|number|ArrayBuffer|NBT.NBTNumber=} [value=0] Value of this tag
 * @param {string=} [name=""] Name of this tag
 * @constructor
 */
NBT.NBTTagFloat = function NBTTagFloat(value, name){
    NBT.NBTNumber.call( this, 4, name );
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagFloat, NBT.NBTNumber );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagFloat
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagFloat.prototype.type = NBT.Type.TAG_FLOAT;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagFloat
 * @returns {string} String value of this tag
 */
NBT.NBTTagFloat.prototype.toString = function(){
    return new DataView( this._value ).getFloat32( 0 ).toString();
};

/**
 * Convert this tag to number
 *
 * @memberOf NBT.NBTTagFloat
 * @returns {number} Numeric value of this tag
 */
NBT.NBTTagFloat.prototype.valueOf = function(){
    return new DataView( this._value ).getFloat32( 0 );
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagFloat
 * @returns {NBT.NBTTagFloat} Clone of this tag
 */
NBT.NBTTagFloat.prototype.clone = function(){
    return new NBT.NBTTagFloat( this._value.slice(0), this._name );
};

/**
 * Set the new value of this tag
 * @example
 * var tag = new NBT.NBTTagFloat(-5); // tag == -5
 * tag.NBTTagFloat(5); // tag == 5
 * tag.NBTTagFloat("10.5"); // tag == 10.5
 *
 * @memberOf NBT.NBTTagFloat
 * @param {string|number|ArrayBuffer|NBT.NBTNumber} value New value of this tag
 */
NBT.NBTTagFloat.prototype.setValue = function(value){
    if ( value instanceof ArrayBuffer ){
        if ( value.byteLength != 4 ) throw new Error('NBTTagFloat: byteLength must be 4');
        this._value = value;
        return;
    }
    if ( typeof value === "string" ){
        value = parseFloat( value );
    }
    var dataView = new DataView( this._value );
    dataView.setFloat32( 0, value );
};