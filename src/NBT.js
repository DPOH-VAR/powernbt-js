'use strict';

/** import dcodeIO.Long as Long */
var Long;
if (typeof require === "function") {
    Long = require('long');
} else {
    Long = global.dcodeIO.Long;
}

function extend(child, parent) {
    for ( var key in parent ) if ( parent.hasOwnProperty(key) ){
        child[key] = parent[key];
    }
    child.prototype = Object.create( parent.prototype, {
        constructor: { value: child }
    });
}

/**
 * NBT namespace
 *
 * @namespace NBT
 * @type {Object}
 */
var NBT = {};

/**
 * Read binary data to NBT tag
 *
 * @memberOf NBT
 * @param {NBT~InputStream|ArrayBuffer|Int8Array|Uint8Array} data Binary data
 * @param {number=} type If specified, skip type and name of tag
 * @returns {NBT.NBTBase} new nbt tag
 */
NBT.readTag = function(data, type){
    var inputStream;
    if ( data instanceof InputStream ) inputStream = data;
    else inputStream = new InputStream( data );
    var name = "";
    if ( type == undefined ) {
        type = inputStream.readInt8();
        if ( type == NBT.Type.TAG_END ) {
            return new NBT.NBTTagEnd();
        }
        var nameLength = inputStream.readInt16();
        var nameData = inputStream.read( nameLength );
        var nameArray = new Int8Array( nameData );
        name = Utf8Utils.decode( nameArray );
    }

    switch ( type ) {
        case NBT.Type.TAG_BYTE:
            return new NBT.NBTTagByte( inputStream.read(1), name );
        case NBT.Type.TAG_SHORT:
            return new NBT.NBTTagShort( inputStream.read(2), name );
        case NBT.Type.TAG_INT:
            return new NBT.NBTTagInt( inputStream.read(4), name );
        case NBT.Type.TAG_LONG:
            return new NBT.NBTTagLong( inputStream.read(8), name );
        case NBT.Type.TAG_FLOAT:
            return new NBT.NBTTagFloat( inputStream.read(4), name );
        case NBT.Type.TAG_DOUBLE:
            return new NBT.NBTTagDouble( inputStream.read(8), name );
        case NBT.Type.TAG_BYTE_ARRAY:
            var byteArraySize = inputStream.readInt32();
            return new NBT.NBTTagByteArray( inputStream.read(byteArraySize), name );
        case NBT.Type.TAG_STRING:
            var stringSize = inputStream.readInt16();
            return new NBT.NBTTagString( inputStream.read(stringSize), name );
        case NBT.Type.TAG_LIST:
            /** @type {NBT.Type|number} */
            var listType = inputStream.readInt8();
            var listSize = inputStream.readInt32();
            var list = [];
            for ( var i=0; i<listSize; i++ ){
                var listTag = NBT.readTag( inputStream, listType );
                list.push( listTag );
            }
            return new NBT.NBTTagList( listType, list, name );
        case NBT.Type.TAG_COMPOUND:
            var value = {};
            while ( true ){
                var compoundTag = NBT.readTag( inputStream );
                if (compoundTag.type == NBT.Type.TAG_END) break;
                value[compoundTag._name] = compoundTag;
            }
            return new NBT.NBTTagCompound( value, name );
        case NBT.Type.TAG_INT_ARRAY:
            var intArraySize = inputStream.readInt32();
            return new NBT.NBTTagIntArray( inputStream.read(intArraySize*4), name );
        default:
            throw new Error( 'NBT parsing error: tag type: '+type );
    }
};

if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports) {
    module["exports"] = NBT;
} else {
    global["NBT"] = NBT;
}
