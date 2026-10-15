const Facade = require('./facade')
const { Macroable } = require('../macro')

/**
 * Class Hash.
 */
class Hash extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'hash';
    }
}
module.exports = Macroable(Hash)