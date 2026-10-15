const Facade = require('./facade')
const { Macroable } = require('../macro')
/**
 * Class Schema.
 */
class Schema extends Facade {

    static $cached = false;

    /**
     * connection method.
     * @static
     * @param {*} $name
     * @returns {any}
     */
    static connection($name) {
        return this.$app['db'].connection($name).getSchemaBuilder();
    }

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    static getFacadeAccessor() {
        return 'db.schema';
    }

}
module.exports = Macroable(Schema)
