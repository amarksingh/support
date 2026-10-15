const RedirectResponse = require('@ostro/http/redirectResponse')
const { Macroable } = require('./macro')
/**
 * Class Redirect.
 */
class Redirect {
    /**
     * __get method.
     * @static
     * @param {*} target
     * @param {*} method
     * @returns {any}
     */
    static __get(target, method) {
        return this.make(new RedirectResponse(), method)
    }
}
module.exports = Macroable(Redirect)