const {container} = require('../index');

container.init(__dirname, 'dependency');

let calc = container.get('calc');

console.log(calc.plus(5, 6)); // Must return 11
console.log(calc.mult(5, 6)); // Must return 30