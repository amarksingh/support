const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Session.
 */
class Session extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'session';
    }
}
module.exports = Macroable(Session)