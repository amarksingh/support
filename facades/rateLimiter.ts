const Facade = require('./facade');
const { Macroable } = require('../macro');
/**
 * Class RateLimiter.
 */
class RateLimiter extends Facade {

    /**
     * getFacadeAccessor method.
     * @static
     * @returns {any}
     */
    static getFacadeAccessor() {
        return require('@ostro/cache/rateLimiter');
    }
}
module.exports = Macroable(RateLimiter)
