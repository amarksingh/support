const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Cache.
 */
class Cache extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'mailer';
    }
}
module.exports = Macroable(Cache)