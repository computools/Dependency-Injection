const {FileLoader} = require('./file-loader');
const {Builder} = require('./builder');
const {SingletonProvider, PrototypeProvider, ObjectProvider} = require('./providers');
const {ContextNotInitializedError} = require('./errors');

/**
 * @class Container
 */
class Container {
    constructor() {
        this.fileLoader = null;
        this.builder = null;
        this.context = null;
        this.name = null;
    }

    configBuilder() {
        this.builder.registryProvider('singleton', SingletonProvider);
        this.builder.registryProvider('prototype', PrototypeProvider);
        this.builder.registryProvider('object', ObjectProvider);
        this.builder.setDefaultProvider('singleton');
    }

    /**
     * @param {string} root
     * @param {string} context
     */
    init(root, context) {
        this.fileLoader = new FileLoader(root);
        this.builder = new Builder(this.fileLoader);
        this.configBuilder();
        let config = this.fileLoader.load(context);
        this.name = config.name;
        this.context = this.builder.build(config.objects);
    }

    /**
     * @param {string} name
     * @return {string}
     */
    get(name) {
        if (!this.context) throw new ContextNotInitializedError(name);
        return this.context.get(name);
    }

    /**
     * @return {string}
     */
    name() {
        return this.name;
    }
}

const inst = new Container();

module.exports = {'container': inst, Container};