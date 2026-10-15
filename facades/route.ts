const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Route.
 */
class Route extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'router';
    }
}
module.exports = Macroable(Route)