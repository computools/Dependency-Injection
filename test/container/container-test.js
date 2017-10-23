const chai = require('chai');
const {container} = require("../../lib/container");

container.init(__dirname, 'dependency');

let expect = chai.expect;
describe('Container ', () => {
    describe('load', () => {
        it('base', () => {
            let test1  = container.get('test1');
            expect(test1.get()).to.equal('test1');
        });
    });
});

