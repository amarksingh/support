import Facade from './facade';
import { Macroable } from '../macro';
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
    static connection($name: string) {
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
export default Macroable(Schema);
