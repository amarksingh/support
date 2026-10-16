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
    static __get(target: Record<string, any>, method: string) {
        return this.make(new RedirectResponse(), method)
    }
}
export default Macroable(Redirect);