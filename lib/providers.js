const {MethodNotImplementedError, DependencyNotFoundError} = require('./errors');

/**
 * @BaseProvider
 */
class BaseProvider {
    /**
     * @param context {Context}
     * @param source {Class|Object|*}
     * @param name {string}
     * @param properties {Object|null}
     */
    constructor(context, source, name, properties) {
        this.context = context;
        this.source = source;
        this.name = name;
        this.properties = properties;
    }

    get() {
        throw new MethodNotImplementedError();
    }

    init() {
    }

    /**
     * @param target {Object}
     */
    setProperties(target) {
        if (!this.properties) return;
        this.properties.forEach((object) => {
            if (!object) throw new DependencyNotFoundError(this.name, object.property, object.name);
            target[object.property] = this.context.get(object.name);
        });
    }
}

/**
 * @class SingletonProvider
 */
class SingletonProvider extends BaseProvider {
    /**
     * @param context {Context}
     * @param source {Class|Object|*}
     * @param name {string}
     * @param properties {Object}
     */
    constructor(context, source, name, properties) {
        super(context, source, name, properties);
        this.inst = new this.source();
    }

    init() {
        this.setProperties(this.inst);
    }

    /**
     * @return {Object|Class|*}
     */
    get() {
        return this.inst;
    }
}

/**
 * @class PrototypeProvider
 */
class PrototypeProvider extends BaseProvider {
    /**
     * @param context {Context}
     * @param source {Class|Object|*}
     * @param name {string}
     * @param properties {Object}
     */
    constructor(context, source, name, properties) {
        super(context, source, name, properties);
    }

    /**
     * @return {Object|Class|*}
     */
    get() {
        let result = new this.source();
        this.setProperties(result);
        return result;
    }
}

/**
 * @class ObjectProvider
 */
class ObjectProvider extends BaseProvider {
    /**
     * @param context {Context}
     * @param source {Class|Object|*}
     * @param name {string}
     */
    constructor(context, source, name) {
        super(context, source, name, null);
    }

    /**
     * @return {Object|Class|*}
     */
    get() {
        return this.source;
    }
}


module.exports = {BaseProvider, SingletonProvider, PrototypeProvider, ObjectProvider};