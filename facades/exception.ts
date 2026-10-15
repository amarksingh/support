const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Exception.
 */
class Exception extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'exceptionHandler';
    }
}
module.exports = Macroable(Exception)