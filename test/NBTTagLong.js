var Long = require('long');
var NBT = require('../dist/PowerNBT');
var assert = require('assert');

describe('NBT.NBTTagLong', function(){

    describe('constructor', function(){
        it('should be equal 0' , function(){
            assert.equal(0, new NBT.NBTTagLong());
            assert.equal(0, new NBT.NBTTagLong(undefined));
            assert.equal(0, new NBT.NBTTagLong(null));
            assert.equal(0, new NBT.NBTTagLong(0));
            assert.equal(0, new NBT.NBTTagLong(""));
            assert.equal(0, new NBT.NBTTagLong("0"));
        });
        it('should have name' , function(){
            assert.equal("name", new NBT.NBTTagLong(0, "name").name);
            assert.equal("", new NBT.NBTTagLong(0, "").name);
            assert.equal("", new NBT.NBTTagLong(0).name);
        });
        it('should have value' , function(){
            assert.equal(1, new NBT.NBTTagLong(1));
        });
    });

    describe('#type', function(){
        it('should be equal TAG_LONG' , function(){
            assert.equal(NBT.Type.TAG_LONG, new NBT.NBTTagLong().type);
        });
    });

    describe('#setValue', function(){
        var tag = new NBT.NBTTagLong();
        it('should change numeric value' , function(){
            tag.setValue(20);
            assert.equal(20, tag);
        });
        it('should change string value' , function(){
            tag.setValue("-20");
            assert.equal(-20, tag);
            tag.setValue("0x3a");
            assert.equal(58, tag);
            tag.setValue("-0x3a");
            assert.equal(-58, tag);
        });
        it('should change tag value' , function(){
            tag.setValue(new NBT.NBTTagLong(15));
            assert.equal(15, tag);
        });
        it('should apply max value', function(){
            tag.setValue(NBT.NBTTagLong.MAX_VALUE);
            assert.equal(NBT.NBTTagLong.MAX_VALUE, tag);
        });
        it('should apply min value', function(){
            tag.setValue(NBT.NBTTagLong.MIN_VALUE);
            assert.equal(NBT.NBTTagLong.MIN_VALUE, tag);
        });
        it('should apply max string value', function(){
            tag.setValue(NBT.NBTTagLong.MAX_VALUE_STR);
            assert.equal(NBT.NBTTagLong.MAX_VALUE_STR, tag);
        });
        it('should apply min string value', function(){
            tag.setValue(NBT.NBTTagLong.MIN_VALUE_STR);
            assert.equal(NBT.NBTTagLong.MIN_VALUE_STR, tag);
        });
        it('should apply overflow', function(){
            tag.setValue("9223372036854775808");
            assert.equal("-9223372036854775808", tag);
            tag.setValue("-9223372036854775809");
            assert.equal("9223372036854775807", tag);
        });
    });

    describe('#clone', function(){
        var a = new NBT.NBTTagLong(123);
        var b = a.clone();
        it('should not return this', function(){
            assert.notEqual(a, b);
        });
        it('should return it instance', function(){
            assert.ok(b instanceof NBT.NBTTagLong);
        });
        it('clone should be equal to this as number', function(){
            assert.equal(a.valueOf(), b.valueOf());
        });
        it('clone should be equal to this as string', function(){
            assert.equal(a.toString(), b.toString());
        });
    });
});