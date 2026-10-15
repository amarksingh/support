const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Config.
 */
class Config extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'config';
    }
}
module.exports = Macroable(Config)