const {FileNotFoundError, ClassNotFoundError} = require('./errors');

/**
 * @class FileLoader
 */
class FileLoader {
    /**
     * @param {string} root
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * The path should be set from root dir
     * @example ( /path/projectDir/dir1/file.js ) if root /path/projectDir should be dir1/file.js
     * @param {string} file     // File name
     * @return {string}         // Full path
     */
    load(file) {
        try {
            if (/^#/.test(file)) {
                file = file.replace(/^#/, "");
                return require(file);
            }

            return require(this.root + '/' + file);
        }
        catch (e) {
            throw new FileNotFoundError(this.root, file);
        }

    }

    /**
     * @param {string} resource
     * @return {string}
     */
    loadResource(resource) {
        try {
            let file = this.load(resource.path);
            let source = resource.className ? file[resource.className] : file;
            if (!source) throw new ClassNotFoundError(resource.path, resource.className);
            return source;
        } catch (e) {
            throw e;
        }

    }
}

module.exports = {FileLoader};
