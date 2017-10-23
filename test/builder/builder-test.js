const chai = require('chai');
let expect = chai.expect;
const {Builder} = require("../../lib/builder");
const {FileLoader} = require("../../lib/file-loader");
const {SingletonProvider,PrototypeProvider,ObjectProvider} = require('../../lib/providers');

const case1 =
    {
        "test1": {
            "resource": {"path": "test1", "className": "Test1"},
            "provider": "singleton",
            "dependency": {
                "property1": "test2"
            }
        },

        'test2': {
            "resource": {"path": "test2", "className": "Test2"},
            "provider": "prototype",
            "dependency": {
                "property1": "test3"
            }
        },
        'test3': {
            "resource": {"path": "test3"},
            "provider": "singleton",
            "dependency": {
                "property1": "test1"
            }
        }
    };

describe('Builder', function () {
    describe('base', function () {
        it('builde and get 3 classes with cercle dep', function () {
            let fileLoader = new FileLoader(__dirname);
            let builder = new Builder(fileLoader);
            builder.registryProvider('singleton',SingletonProvider);
            builder.registryProvider('prototype',PrototypeProvider);
            builder.registryProvider('object',ObjectProvider);
            builder.setDefaultProvider('singleton');


            let context = builder.build(case1);
            let test1 = context.get("test1");
            let test2 = context.get("test2");
            let test3 = context.get("test3");
            expect(test1.get()).to.equal('test1');
            expect(test1.property1.get()).to.equal('test2');

            expect(test2.get()).to.equal('test2');
            expect(test2.property1.get()).to.equal('test3');

            expect(test3.get()).to.equal('test3');
            expect(test3.property1.get()).to.equal('test1');
        });
    });
});

