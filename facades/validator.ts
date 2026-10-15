const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class validator.
 */
class validator extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'validation';
    }
}
module.exports = Macroable(validator)