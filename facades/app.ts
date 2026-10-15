const Facade = require('./facade')
const { Macroable } = require('../macro')

/**
 * Class Application.
 */
class Application extends Facade {

    /**
     * __get method.
     * @static
     * @param {*} $target
     * @param {*} $method
     * @returns {any}
     */
    static __get($target, $method) {
        return this.make($target.$app,$method);
    }
}

module.exports = Macroable(Application)