var Long = require('long');
var NBT = require('../dist/PowerNBT');
var assert = require('assert');

describe('NBT.NBTTagShort', function(){

    describe('constructor', function(){
        it('should be equal 0' , function(){
            assert.equal(0, new NBT.NBTTagShort());
            assert.equal(0, new NBT.NBTTagShort(undefined));
            assert.equal(0, new NBT.NBTTagShort(null));
            assert.equal(0, new NBT.NBTTagShort(0));
            assert.equal(0, new NBT.NBTTagShort(""));
            assert.equal(0, new NBT.NBTTagShort("0"));
        });
        it('should have name' , function(){
            assert.equal("name", new NBT.NBTTagShort(0, "name").name);
            assert.equal("", new NBT.NBTTagShort(0, "").name);
            assert.equal("", new NBT.NBTTagShort(0).name);
        });
        it('should have value' , function(){
            assert.equal(1, new NBT.NBTTagShort(1));
        });
    });

    describe('#type', function(){
        it('should be equal TAG_SHORT' , function(){
            assert.equal(NBT.Type.TAG_SHORT, new NBT.NBTTagShort().type);
        });
    });

    describe('#setValue', function(){
        var tag = new NBT.NBTTagShort();
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
            tag.setValue(new NBT.NBTTagShort(15));
            assert.equal(15, tag);
        });
        it('should apply max value', function(){
            tag.setValue(NBT.NBTTagShort.MAX_VALUE);
            assert.equal(NBT.NBTTagShort.MAX_VALUE, tag);
        });
        it('should apply min value', function(){
            tag.setValue(NBT.NBTTagShort.MIN_VALUE);
            assert.equal(NBT.NBTTagShort.MIN_VALUE, tag);
        });
        it('should apply overflow', function(){
            tag.setValue(NBT.NBTTagShort.MAX_VALUE+1);
            assert.equal(NBT.NBTTagShort.MIN_VALUE, tag);
            tag.setValue(NBT.NBTTagShort.MIN_VALUE-1);
            assert.equal(NBT.NBTTagShort.MAX_VALUE, tag);
        });
    });

    describe('#clone', function(){
        var a = new NBT.NBTTagShort(123);
        var b = a.clone();
        it('should not return this', function(){
            assert.notEqual(a, b);
        });
        it('should return it instance', function(){
            assert.ok(b instanceof NBT.NBTTagShort);
        });
        it('clone should be equal to this as number', function(){
            assert.equal(a.valueOf(), b.valueOf());
        });
        it('clone should be equal to this as string', function(){
            assert.equal(a.toString(), b.toString());
        });
    });
});