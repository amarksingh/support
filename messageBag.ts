const MessageBagContracts = require('@ostro/contracts/support/messageBag')
const { get, set } = require('lodash')
const kMessage = Symbol('message')
/**
 * Class MessageBag.
 */
class MessageBag extends MessageBagContracts {
    /**
     * Create a new instance.
     * @param {*} objects
     */
    constructor(objects: any) {
        super()
        this[kMessage] = objects
    }
    /**
     * add method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    add(key: string, value: any) {
        return set(this[kMessage], key, value)
    }
    /**
     * get method.
     * @param {*} key
     * @param {*} defaultValue
     * @returns {any}
     */
    get(key: string, defaultValue: any = null) {
        return get(this[kMessage], key) || defaultValue;
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
    /**
     * all method.
     * @returns {any}
     */
    all() {
        return this[kMessage]
    }
}
module.exports = MessageBag