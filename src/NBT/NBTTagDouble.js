/**
 * NBTTagDouble represents a double (64bit) value
 * @example
 * var a = new NBT.NBTTagDouble(5.25, "floatTag") // a == 5.25
 * var b = new NBT.NBTTagDouble("-10.5")// b == -10.5
 * var c = new NBT.NBTTagDouble(a+b) // c == -5.25
 *
 * @memberOf NBT
 * @augments NBT.NBTNumber
 * @param {string|number|ArrayBuffer|NBT.NBTNumber=} [value=0] Value of this tag
 * @param {string=} [name=""] Name of this tag
 * @constructor
 */
NBT.NBTTagDouble = function NBTTagDouble(value, name){
    NBT.NBTNumber.call( this, 8, name );
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagDouble, NBT.NBTNumber );

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagDouble
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagDouble.prototype.type = NBT.Type.TAG_DOUBLE;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagDouble
 * @returns {string} String value of this tag
 */
NBT.NBTTagDouble.prototype.toString = function(){
    return new DataView( this._value ).getFloat64( 0 ).toString();
};

/**
 * Convert this tag to number
 *
 * @memberOf NBT.NBTTagDouble
 * @returns {number} Numeric value of this tag
 */
NBT.NBTTagDouble.prototype.valueOf = function(){
    return new DataView( this._value ).getFloat64( 0 );
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagDouble
 * @returns {NBT.NBTTagDouble} Clone of this tag
 */
NBT.NBTTagDouble.prototype.clone = function(){
    return new NBT.NBTTagDouble( this._value.slice(0), this._name );
};

/**
 * Set the new value of this tag
 * @example
 * var tag = new NBT.NBTTagDouble(-5); // tag == -5
 * tag.NBTTagDouble(5); // tag == 5
 * tag.NBTTagDouble("10.5"); // tag == 10.5
 *
 * @memberOf NBT.NBTTagDouble
 * @param {string|number|ArrayBuffer|NBT.NBTNumber} value New value of this tag
 */
NBT.NBTTagDouble.prototype.setValue = function(value){
    if ( value instanceof ArrayBuffer ){
        if ( value.byteLength != 8 ) throw new Error('NBTTagDouble: byteLength must be 8');
        this._value = value;
        return;
    }
    if ( typeof value === "string" ){
        value = parseFloat( value );
    }
    var dataView = new DataView( this._value );
    dataView.setFloat64( 0, value );
};