# NodeJS Dependency Injection

In software engineering, dependency injection is a technique whereby one object supplies the dependencies of another object. A dependency is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it.

## Installing

```sh
$ npm install --save nodejs-di
```

## How to use

First of all you need to create dependency.json.

You can use next providers:
 - prototype
 - singleton
 - object

**Prototype provider** create your class everytime you use it.
**Singleton provider** create your class only one time and inject link. 
**Object provider** include object to your class.

If you export injection class on object you need to write on dependency.json className. You can see example below.


```json
{
  "name" : "calc",
  "objects" :
    {
      "mult" : {
        "resource": {"path" : "app/mult", "className" : "Mult"},
        "provider" : "prototype"
      },
      "plus" : {
        "resource": {"path" : "app/plus", "className" : "Plus"},
        "provider" : "prototype"
      },
      "calc": {
        "resource": {"path" : "app/calc", "className" : "Calc"},
        "provider" : "singleton",
        "dependency" :{
          "plusWorker" : "plus",
          "multWorker" : "mult"
        }
      }

    }
}
```

app/calc.js
```js

class Calc {
    constructor() {
        this.multWorker = null;
        this.plusWorker = null;
    }

    mult(a, b) {
        return this.plusWorker.do(a, b);
    }

    plus(a, b) {
        return this.plusWorker.do(a, b);
    }
}

module.exports = {Calc};

```

app/mult.js
```js

class Mult {
    do(a, b) {
        return a * b;
    }
}

module.exports = {Mult};

```

app/plus.js
```js

class Plus {
    do(a, b) {
        return a + b;
    }
}

module.exports = {Plus};

```


index.js
```js

const {container} = require('../index');

container.init(__dirname, 'dependency');

let calc = container.get('calc');

console.log(calc.plus(5, 6)); // Must return 11
console.log(calc.mult(5, 6)); // Must return 30

```

On container.init you need to set root dir for dependency file and dependency file name.

Also you can add node_module injection. For it you need to add on the start of path `#`. You can see example below
 
```json
{
  "name" : "calc",
  "objects" :
    {
      "someModule": {
        "resource": {"path" : "#some-module", "className" : "SomeClass"},
        "provider" : "prototype"
      },
      "mult" : {
        "resource": {"path" : "app/mult", "className" : "Mult"},
        "provider" : "prototype"
      },
      "plus" : {
        "resource": {"path" : "app/plus", "className" : "Plus"},
        "provider" : "prototype"
      },
      "calc": {
        "resource": {"path" : "app/calc", "className" : "Calc"},
        "provider" : "singleton",
        "dependency" :{
          "plusWorker" : "plus",
          "multWorker" : "mult"
        }
      }

    }
}
```

## License

This project is licensed under the MIT License