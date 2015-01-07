/**
 * @memberOf NBT~
 * @constructor
 */
function OutputStream(){
    /**
     * @type {Array}
     * @private
     */
    this._buffer = [];
}

/**
 * @param {*} data
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.write = function(data){
    this._buffer.push( data );
};

/**
 * @param {number} value
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.writeInt8 = function(value){
    var array = new ArrayBuffer( 1 );
    new DataView( array ).setInt8( 0, value );
    this._buffer.push( array );
};

/**
 * @param {number} value
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.writeInt16 = function(value){
    var array = new ArrayBuffer( 2 );
    new DataView( array ).setInt16( 0, value );
    this._buffer.push( array );
};

/**
 * @param {number} value
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.writeInt32 = function(value){
    var array = new ArrayBuffer( 4 );
    new DataView( array ).setInt32( 0, value );
    this._buffer.push( array );
};

/**
 * @param {number} value
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.writeFloat32 = function(value){
    var array = new ArrayBuffer( 4 );
    new DataView( array ).setFloat32( 0, value );
    this._buffer.push( array );
};

/**
 * @param {number} value
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.writeFloat64 = function(value){
    var array = new ArrayBuffer( 4 );
    new DataView( array ).setFloat64( 0, value );
    this._buffer.push( array );
};

/**
 * @param {string} value
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.writeUtf8String = function(value){
    var data = Utf8Utils.encode( value.toString() );
    var array = new ArrayBuffer( data.length || data.byteLength || 0 );
    this.writeInt16( array.byteLength );
    var dataView = new DataView( array );
    for ( var i=0; i< array.byteLength; i++ ){
        dataView.setInt8( i, data[i] );
    }
    this._buffer.push( array );
};

/**
 * @returns {Blob}
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.toBlob = function(){
    return new Blob( this._buffer );
};

/**
 * @returns {ArrayBuffer}
 * @memberOf NBT~OutputStream#
 */
OutputStream.prototype.toArrayBuffer = function(){
    if (this._buffer.length == 0) return new ArrayBuffer( 0 );
    if (this._buffer.length == 1) return this._buffer[ 0 ];
    var size = this._buffer.reduce(function(t, array){
        return t + array.byteLength || array.length;
    },0);
    var result = new ArrayBuffer( size );
    var resultDataView = new DataView( result );
    var t = 0;
    this._buffer
        .map(function(buffer){
            return new DataView( buffer );
        })
        .forEach(function(dataView){
            for ( var i=0; i<dataView.byteLength; i++ ){
                resultDataView.setInt8( t++, dataView.getInt8(i) );
            }
        });
    this._buffer = [result];
    return result;
};