const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Carbon.
 */
class Carbon extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'carbon';
    }
}
module.exports = Macroable(Carbon)