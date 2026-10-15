/**
 * Class Env.
 */
class Env {
    /**
     * get method.
     * @static
     * @param {*} key
     * @param {*} defaultValue
     * @returns {any}
     */
    static get(key: string, defaultValue: any = null) {
        return process.env[key] || defaultValue;
    }
    /**
     * set method.
     * @static
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    static set(key: string, value: any) {
        process.env[key] = value;
    }
}

module.exports = Env