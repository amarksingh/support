const ErrorBagcontract = require('@ostro/contracts/support/errorBag')
const { get, set } = require('lodash')
const kErrors = Symbol('errors')
/**
 * Class ErrorBag.
 */
class ErrorBag extends ErrorBagcontract {
    /**
     * Create a new instance.
     * @param {*} objects
     */
    constructor(objects: any) {
        super()
        this[kErrors] = objects
    }
    /**
     * add method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    add(key: string, value: any) {
        return set(this[kErrors], key, value);
    }
    /**
     * get method.
     * @param {*} key
     * @param {*} defaultValue
     * @returns {any}
     */
    get(key: string, defaultValue: any = null) {
        return get(this[kErrors], key) || defaultValue;
    }
    /**
     * first method.
     * @param {*} key
     * @param {*} defaultValue
     * @returns {any}
     */
    first(key: string, defaultValue: any = null) {
        let data = this.get(key)
        return (Array.isArray(data) ? data[0] : data) || defaultValue;
    }
    /**
     * has method.
     * @param {*} key
     * @returns {any}
     */
    has(key: string) {
        return this.get(key) != undefined;
    }
}

module.exports = ErrorBag