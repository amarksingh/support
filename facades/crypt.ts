const Facade = require('./facade')
const { Macroable } = require('../macro')

/**
 * Class Crypt.
 */
class Crypt extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'encrypter';
    }
}
module.exports = Macroable(Crypt)