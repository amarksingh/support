import * as functions from './function';
import * as arrays from './array';
import * as strings from './string';
import './object';

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
    }
})();

export {};
