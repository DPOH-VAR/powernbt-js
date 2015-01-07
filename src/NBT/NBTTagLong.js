/**
 * NBTTagLong represents a long (64bit) value
 * @example
 * var a = new NBT.NBTTagLong(5, "longTag") // a == 5
 * var b = new NBT.NBTTagLong("10") // b == 10
 * var c = new NBT.NBTTagLong(a*b) // c == 50
 *
 * @memberOf NBT
 * @augments NBT.NBTNumber
 * @param {string|number|ArrayBuffer|NBT.NBTNumber=} [value=0] Value of tag
 * @param {string=} [name=""] Name of tag
 * @constructor
 */
NBT.NBTTagLong = function NBTTagLong(value, name){
    NBT.NBTNumber.call( this, 8, name );
    if ( value ) this.setValue( value );
};
extend( NBT.NBTTagLong, NBT.NBTNumber );

/**
 * Maximum numeric value of this tag
 *
 * @memberOf NBT.NBTTagLong
 * @type {number}
 */
NBT.NBTTagLong.MAX_VALUE = 9007199254740992;

/**
 * Minimum numeric value of this tag
 *
 * @memberOf NBT.NBTTagLong
 * @type {number}
 */
NBT.NBTTagLong.MIN_VALUE = -9007199254740992;

/**
 * Maximum string value of this tag
 *
 * @memberOf NBT.NBTTagLong
 * @type {string}
 */
NBT.NBTTagLong.MAX_VALUE_STR = "9223372036854775807";

/**
 * Minimum string value of this tag
 *
 * @memberOf NBT.NBTTagLong
 * @type {string}
 */
NBT.NBTTagLong.MIN_VALUE_STR = "-9223372036854775808";

/**
 * Type of this tag
 *
 * @memberOf NBT.NBTTagLong
 * @type {NBT.Type}
 * @readonly
 */
NBT.NBTTagLong.prototype.type = NBT.Type.TAG_LONG;

/**
 * Convert this tag to string
 *
 * @memberOf NBT.NBTTagLong
 * @param {number=} radix
 * @returns {string}
 */
NBT.NBTTagLong.prototype.toString = function(radix){
    return this._long().toString( radix );
};

/**
 * Get high 32 bits
 *
 * @memberOf NBT.NBTTagLong
 * @returns {number} Integer value of high 32 bits
 */
NBT.NBTTagLong.prototype.getHigh = function(){
    return new DataView( this._value ).getInt32( 0 );
};

/**
 * Set high 32 bits
 *
 * @memberOf NBT.NBTTagLong
 * @param {number} value New value for high 32 bits
 * @returns {NBT.NBTTagLong} this
 */
NBT.NBTTagLong.prototype.setHigh = function(value){
    new DataView( this._value ).setInt32( 0, value );
    return this;
};

/**
 * Get low 32 bits
 *
 * @memberOf NBT.NBTTagLong
 * @returns {number}  Integer value of low 32 bits
 */
NBT.NBTTagLong.prototype.getLow = function(){ // eron-don-don
    return new DataView( this._value ).getInt32( 4 );
};

/**
 * Set low 32 bits
 *
 * @memberOf NBT.NBTTagLong
 * @param {number} value New value for low 32 bits
 * @returns {NBT.NBTTagLong} this
 */
NBT.NBTTagLong.prototype.setLow = function(value){
    new DataView( this._value ).setInt32( 4, value );
    return this;
};

/**
 * @returns {Long}
 * @private
 */
NBT.NBTTagLong.prototype._long = function(){
    return new Long( this.getLow(), this.getHigh() );
};

/**
 * Set the new value of this tag <br/>
 * If you set value as string, you can optionally specify the radix <br/>
 * Tag can take integer values from "-9223372036854775808" to "9223372036854775807" as string <br/>
 * and from -9007199254740992 to 9007199254740992 as number (javascript restrictions) <br/>
 * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number}
 * @example
 * var tag = new NBT.NBTTagLong(-12345678); // tag == "-12345678" && tag == -12345678
 * tag.setValue(128); // tag == 128
 * tag.setValue("ff", 16); // tag == 255
 * tag.setValue("9007199254740993"); // tag == "9007199254740993" && tag == 9007199254740992
 * tag.setValue(9007199254740993); // tag == "9007199254740992" && tag == 9007199254740992
 *
 * @memberOf NBT.NBTTagLong
 * @param {string|number|ArrayBuffer|NBT.NBTNumber} value New value of tag
 * @param {number=} [radix=10]
 */
NBT.NBTTagLong.prototype.setValue = function(value, radix){
    if ( value instanceof ArrayBuffer ){
        if ( value.byteLength != 8 ) throw new Error('NBTTagLong: byteLength must be 8');
        this._value = value;
        return;
    }
    var dataView = new DataView( this._value );
    if ( value instanceof NBT.NBTTagLong ){
        dataView.setInt32( 0, value.getHigh() );
        dataView.setInt32( 4, value.getLow() );
        return;
    } else if ( value instanceof NBT.NBTNumber ){
        value = value.valueOf();
    }
    if ( typeof value === "number" ){
        value = Long.fromNumber( value );
    } else if ( typeof value === "string" ){
        if ( value.match(/^0[xX][0-9a-fA-F]+$/) ) { // hex
            value = Long.fromString( value.substr(2), 16 );
        } else if ( value.match(/^-0[xX][0-9a-fA-F]+$/) ) { // -hex
            value = Long.fromString( "-" + value.substr(3), 16 );
        } else if ( value.match(/^-?0[0-7]+$/) ) { // oct
            value = Long.fromString( value.substr(1), false, 8 );
        } else { // dec
            value = Long.fromString( value, false, radix||10 );
        }
    }
    if ( value instanceof Long ){
        dataView.setInt32( 0, value.high );
        dataView.setInt32( 4, value.low );
    } else {
        dataView.setInt32( 0, 0 );
        dataView.setInt32( 4, 0 );
    }
};

/**
 * Convert this tag to number <br/>
 * JavaScript has restrictions for 53 bit
 * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number}
 *
 * @memberOf NBT.NBTTagLong
 * @returns {number}
 */
NBT.NBTTagLong.prototype.valueOf = function(){
    return this._long().toNumber();
};

/**
 * Create clone of this tag
 *
 * @memberOf NBT.NBTTagLong
 * @returns {NBT.NBTTagLong} Clone of this tag
 */
NBT.NBTTagLong.prototype.clone = function(){
    return new NBT.NBTTagLong( this._value.slice(0), this._name );
};