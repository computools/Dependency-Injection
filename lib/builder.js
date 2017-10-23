const {Context} = require('./сontext');

/**
 * @class Builder
 */
class Builder {
    /**
     * @param fileLoader {FileLoader}
     */
    constructor(fileLoader) {
        this.fileLoader = fileLoader;
        this.providers = {};
        this.defaultProvider = '';
    }

    /**
     * @param name {string}
     * @param providerSource
     */
    registryProvider(name, providerSource) {
        this.providers[name] = providerSource;
    }

    /**
     * @param type {string}
     */
    setDefaultProvider(type) {
        this.defaultProvider = type;
    }

    /**
     * @param type {string}
     * @return providerByType {BaseProvider}
     */
    providerByType(type) {
        return type && this.providers[type] ? this.providers[type] : this.providers[this.defaultProvider];
    }

    /**
     * @param dependency {Object}
     * @return {Array}
     */
    dependencyToList(dependency) {
        return dependency ? Object.keys(dependency).map(key => ({property: key, name: dependency[key]})) : [];
    }

    /**
     * @param dependency {Object}
     * @return {Context}
     */
    build(dependency) {
        let context = new Context();

        Object.keys(dependency).forEach(name => {
            let item = dependency[name];
            let source = this.fileLoader.loadResource(item.resource);
            let provideClazz = this.providerByType(item.provider);
            context.set(name, new provideClazz(context, source, name, this.dependencyToList(item.dependency)));
        });

        context.init();
        return context;
    }
}

module.exports = {Builder};