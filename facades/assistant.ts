const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Assistant.
 */
class Assistant extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return '@ostro/contracts/console/kernel';
    }
}

module.exports = Macroable(Assistant)
