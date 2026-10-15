const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Logger.
 */
class Logger extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'logger';
    }
}
module.exports = Macroable(Logger)