import Facade from './facade';
import { Macroable } from '../macro';
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
export default Macroable(Route);