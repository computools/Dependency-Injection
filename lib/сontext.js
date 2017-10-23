const {DependencyNotResourceError} = require('./errors');

/**
 * @class Context
 */
class Context {
    constructor() {
        this.map = {};
    }

    init() {
        return Object.values(this.map).forEach(item => item.init());
    }

    /**
     * @param name {string}
     * @return {Class|Object|*}
     */
    get(name) {
        if (!this.map[name]) throw new DependencyNotResourceError(name);
        return this.map[name].get();
    }

    /**
     * @param name {string}
     * @param object {Class|Object|*}
     */
    set(name, object) {
        this.map[name] = object;
    }
}

module.exports = {Context};