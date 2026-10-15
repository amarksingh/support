const InputContracts = require('@ostro/contracts/support/input')
const {get} = require('lodash')
const kInput = Symbol('input')
/**
 * Class Input.
 */
class Input extends InputContracts {
    /**
     * Create a new instance.
     * @param {*} objects
     */
    constructor(objects) {
        super()
        this[kInput] = objects
    }
    /**
     * get method.
     * @param {*} key
     * @param {*} defaultValue
     * @returns {any}
     */
    get(key, defaultValue = null) {
        return get(this[kInput], key) || defaultValue;
    }
}

module.exports = Input