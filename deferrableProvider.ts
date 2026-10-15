const ServiceProvider = require('./serviceProvider')
/**
 * Class DeferrableProvider.
 */
class DeferrableProvider extends ServiceProvider {

    /**
     * isDeferred method.
     * @returns {any}
     */
    isDeferred() {
        return true
    }
}
module.exports = DeferrableProvider