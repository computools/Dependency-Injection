
const chai = require('chai');
const {FileNotFoundError,ClassNotFoundError} = require("../../lib/errors");
const {FileLoader} = require("../../lib/file-loader");
const {Test} = require("./test-class");

let expect = chai.expect;
describe('File loader test', function() {
    describe('load', function() {
        it('correct load file', function() {
            let loader = new FileLoader(__dirname);
            expect(loader.load('test').test).to.equal('ok');
        });
        it('wrong load file', function() {
            let loader = new FileLoader(__dirname);
            try{
                loader.load('notest').test
                expect(true).to.equal(false);
            } catch (err){
                expect(err instanceof FileNotFoundError).to.equal(true)
            }

        });
        it('correct load dependency', function() {
            let loader = new FileLoader(__dirname);
            let source = loader.loadResource({'path':'test-class','className':'Test'})
            expect(source instanceof Test).to.equal(false);


        });
        it('wrong load dependency', function() {
            let loader = new FileLoader(__dirname);
            try{
                let source = loader.loadResource({'path':'test-class','className':'Test1'})
                expect(true).to.equal(false);
            } catch (err){
                expect(err instanceof ClassNotFoundError).to.equal(true)
            }

        });
    });
});

