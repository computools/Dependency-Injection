/**
 * @class ContextNotInitializedError
 */
class ContextNotInitializedError extends Error {
    /**
     * @param file {string}
     */
    constructor(file) {
        super(`Try load file ${file}. Context not initialized.`);
    }
}

/**
 * @class FileNotFoundError
 */
class FileNotFoundError extends Error {
    /**
     * @param root {string}
     * @param file {string}
     */
    constructor(root, file) {
        super(`File ${file} not found in directory: ${root}`);
    }
}

/**
 * @class ClassNotFoundError
 */
class ClassNotFoundError extends Error {
    /**
     * @param file {string}
     * @param source {string}
     */
    constructor(file, source) {
        super(`File ${file} doesn't  contains source ${source}`);
    }
}

/**
 * @class DependencyNotResourceError
 */
class DependencyNotResourceError extends Error {
    /**
     * @param name {String}
     */
    constructor(name) {
        super(`Can't be found resource by name ${name}`);
    }
}

/**
 * @class DependencyNotFoundError
 */
class DependencyNotFoundError extends Error {
    /**
     * @param target {string}
     * @param property {string}
     * @param source {string}
     */
    constructor(target, property, source) {
        super(`Can't be found dependency ${source} for target ${target} property ${property}`);
    }
}

/**
 * @class MethodNotImplementedError
 */
class MethodNotImplementedError extends Error {
    constructor() {
        super(`Method don't implemented`);
    }
}

module.exports = {
    ContextNotInitializedError,
    DependencyNotResourceError,
    FileNotFoundError,
    ClassNotFoundError,
    MethodNotImplementedError,
    DependencyNotFoundError
};
