import * as functions from './function';
import * as arrays from './array';
import * as strings from './string';
import './object';
import * as path from 'path';
import * as fs from 'fs';

let loaded = false;

(function globals() {
    if (!loaded) {
        loaded = true;
        Object.keys(functions).forEach(helperKey => {
            (global as any)[helperKey] = (functions as any)[helperKey];
        });
        Object.keys(arrays).forEach(arraykey => {
            Object.defineProperty(Array.prototype, arraykey, {
                value: (arrays as any)[arraykey],
                enumerable: false,
                writable: true,
                configurable: true
            });
        });
        const nativeStringProtoProps = new Set(Object.getOwnPropertyNames(String.prototype));
        Object.keys(strings).forEach(strKey => {
            const strFn = (strings as any)[strKey];
            (String as any)[strKey] = strFn;
            if (!nativeStringProtoProps.has(strKey)) {
                Object.defineProperty(String.prototype, strKey, {
                    value: function (this: any, ...args: any[]) {
                        return strFn(this, ...args);
                    },
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
        });

        const Module = require('module');
        if (Module && Module._resolveFilename && !(Module as any)._ostroPathHookInstalled) {
            (Module as any)._ostroPathHookInstalled = true;
            const originalResolveFilename = Module._resolveFilename;
            Module._resolveFilename = function (request: string, parent: any, isMain: boolean, options: any) {
                if (typeof request === 'string' && request.startsWith('~/')) {
                    const relativePath = request.slice(2);
                    const cwd = (global as any).$basePath || process.cwd();
                    const directPath = path.resolve(cwd, relativePath);
                    const buildPath = path.resolve(cwd, 'build', relativePath);
                    const hasTs = Boolean(require.extensions && require.extensions['.ts']);
                    if (fs.existsSync(directPath + '.js') || fs.existsSync(path.join(directPath, 'index.js')) || (fs.existsSync(directPath) && !fs.statSync(directPath).isDirectory())) {
                        request = directPath;
                    } else if (fs.existsSync(buildPath + '.js') || fs.existsSync(path.join(buildPath, 'index.js')) || (fs.existsSync(buildPath) && !fs.statSync(buildPath).isDirectory())) {
                        request = buildPath;
                    } else if (hasTs && (fs.existsSync(directPath + '.ts') || fs.existsSync(path.join(directPath, 'index.ts')))) {
                        request = directPath;
                    } else {
                        request = directPath;
                    }
                }
                return originalResolveFilename.call(this, request, parent, isMain, options);
            };
        }
    }
})();

export {};
