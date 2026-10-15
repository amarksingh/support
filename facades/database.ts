const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Database.
 */
class Database extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return 'db';
    }
}
module.exports = Macroable(Database)