var Long = require('long');
var NBT = require('../dist/PowerNBT');
var assert = require('assert');

describe('NBT', function(){
    describe('.Type', function(){
        it('should contains types' , function(){
            assert.equal(0, NBT.Type.TAG_END);
            assert.equal(1, NBT.Type.TAG_BYTE);
            assert.equal(2, NBT.Type.TAG_SHORT);
            assert.equal(3, NBT.Type.TAG_INT);
            assert.equal(4, NBT.Type.TAG_LONG);
            assert.equal(5, NBT.Type.TAG_FLOAT);
            assert.equal(6, NBT.Type.TAG_DOUBLE);
            assert.equal(7, NBT.Type.TAG_BYTE_ARRAY);
            assert.equal(8, NBT.Type.TAG_STRING);
            assert.equal(9, NBT.Type.TAG_LIST);
            assert.equal(10, NBT.Type.TAG_COMPOUND);
            assert.equal(11, NBT.Type.TAG_INT_ARRAY);
        });
    });
});