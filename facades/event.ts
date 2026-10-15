const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Event.
 */
class Event extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'event';
    }
}
module.exports = Macroable(Event)