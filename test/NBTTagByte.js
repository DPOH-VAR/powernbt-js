var Long = require('long');
var NBT = require('../dist/PowerNBT');
var assert = require('assert');

describe('NBT.NBTTagByte', function(){

    describe('constructor', function(){
        it('should be equal 0' , function(){
            assert.equal(0, new NBT.NBTTagByte());
            assert.equal(0, new NBT.NBTTagByte(undefined));
            assert.equal(0, new NBT.NBTTagByte(null));
            assert.equal(0, new NBT.NBTTagByte(0));
            assert.equal(0, new NBT.NBTTagByte(""));
            assert.equal(0, new NBT.NBTTagByte("0"));
        });
        it('should have name' , function(){
            assert.equal("name", new NBT.NBTTagByte(0, "name").name);
            assert.equal("", new NBT.NBTTagByte(0, "").name);
            assert.equal("", new NBT.NBTTagByte(0).name);
        });
        it('should have value' , function(){
            assert.equal(1, new NBT.NBTTagByte(1));
        });
    });

    describe('#type', function(){
        it('should be equal TAG_BYTE' , function(){
            assert.equal(NBT.Type.TAG_BYTE, new NBT.NBTTagByte().type);
        });
    });

    describe('#setValue', function(){
        var tag = new NBT.NBTTagByte();
        it('should change numeric value' , function(){
            tag.setValue(20);
            assert.equal(20, tag);
        });
        it('should change string value' , function(){
            tag.setValue("-20");
            assert.equal(-20, tag);
            tag.setValue("0x3a");
            assert.equal(58, tag);
        });
        it('should change tag value' , function(){
            tag.setValue(new NBT.NBTTagByte(15));
            assert.equal(15, tag);
        });
        it('should apply max value', function(){
            tag.setValue(NBT.NBTTagByte.MAX_VALUE);
            assert.equal(NBT.NBTTagByte.MAX_VALUE, tag);
        });
        it('should apply min value', function(){
            tag.setValue(NBT.NBTTagByte.MIN_VALUE);
            assert.equal(NBT.NBTTagByte.MIN_VALUE, tag);
        });
        it('should apply overflow', function(){
            tag.setValue(NBT.NBTTagByte.MAX_VALUE+1);
            assert.equal(NBT.NBTTagByte.MIN_VALUE, tag);
            tag.setValue(NBT.NBTTagByte.MIN_VALUE-1);
            assert.equal(NBT.NBTTagByte.MAX_VALUE, tag);
        });
    });

    describe('#clone', function(){
        var a = new NBT.NBTTagByte(123);
        var b = a.clone();
        it('should not return this', function(){
            assert.notEqual(a, b);
        });
        it('should return it instance', function(){
            assert.ok(b instanceof NBT.NBTTagByte);
        });
        it('clone should be equal to this as number', function(){
            assert.equal(a.valueOf(), b.valueOf());
        });
        it('clone should be equal to this as string', function(){
            assert.equal(a.toString(), b.toString());
        });
    });
});