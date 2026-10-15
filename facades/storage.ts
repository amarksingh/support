const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Storage.
 */
class Storage extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'filesystem';
    }
}
module.exports = Macroable(Storage)