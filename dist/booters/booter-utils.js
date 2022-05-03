"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadClassesFromFiles = exports.isClass = exports.discoverFiles = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const path_1 = tslib_1.__importDefault(require("path"));
const util_1 = require("util");
const glob = (0, util_1.promisify)(require('glob'));
const debug = (0, debug_1.default)('loopback:boot:booter-utils');
/**
 * Returns all files matching the given glob pattern relative to root
 *
 * @param pattern - A glob pattern
 * @param root - Root folder to start searching for matching files
 * @returns Array of discovered files
 */
async function discoverFiles(pattern, root) {
    return glob(pattern, { root: root });
}
exports.discoverFiles = discoverFiles;
/**
 * Given a function, returns true if it is a class, false otherwise.
 *
 * @param target - The function to check if it's a class or not.
 * @returns True if target is a class. False otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isClass(target) {
    return (typeof target === 'function' && target.toString().indexOf('class') === 0);
}
exports.isClass = isClass;
/**
 * Returns an Array of Classes from given files. Works by requiring/importing the file,
 * identifying the exports from the file by getting the keys of the file
 * and then testing each exported member to see if it's a class or not.
 *
 * This detects the support of dynamic imports and uses them if available
 * as this allows ES6 modules to be imported.
 *
 * @param files - An array of string of absolute file paths
 * @param projectRootDir - The project root directory
 * @returns An array of Class constructors from a file
 */
async function loadClassesFromFiles(files, projectRootDir) {
    //Creates an importer which can import using either a dynamic import or require
    const importFile = async (file) => {
        try {
            //Try to import in a way that supports ES6 modules
            return await Promise.resolve(new Function('file', 'return import(file)')(file));
        }
        catch (e) {
            //Fallback to require if dynamic import is not supported
            return require(file);
        }
    };
    const classes = [];
    for (const file of files) {
        debug('Loading artifact file %j', path_1.default.relative(projectRootDir, file));
        const moduleObj = await importFile(file);
        for (const k in moduleObj) {
            const exported = moduleObj[k];
            if (isClass(exported)) {
                debug('  add %s (class %s)', k, exported.name);
                classes.push(exported);
            }
            else {
                debug('  skip non-class %s', k);
            }
        }
    }
    return classes;
}
exports.loadClassesFromFiles = loadClassesFromFiles;
//# sourceMappingURL=booter-utils.js.map