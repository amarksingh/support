/**
 * Class ServiceProvider.
 */
class ServiceProvider {
    /**
     * Create a new instance.
     * @param {*} $app
     */
    constructor($app: any) {
        this.$app = $app
    }
    /**
     * boot method.
     * @returns {any}
     */
    boot() {

    }
    
    /**
     * register method.
     * @returns {any}
     */
    register() {

    }
    
    /**
     * callBootingCallbacks method.
     * @returns {any}
     */
    callBootingCallbacks() {

    }
    
    /**
     * callBootedCallbacks method.
     * @returns {any}
     */
    callBootedCallbacks() {

    }

    /**
     * commands method.
     * @param {*} $commands
     * @returns {any}
     */
    commands($commands: any) {
        $commands = Array.isArray($commands) ? $commands : arguments
        if ($commands.length) {
            const Assistant = require('@ostro/console/application');
            Assistant.addBootstraper(function($artisan) {
                $artisan.resolveCommands($commands);
            });
        }
    }
    
    /**
     * provides method.
     * @returns {any}
     */
    provides() {
        return []
    }
    
    /**
     * isDeferred method.
     * @returns {any}
     */
    isDeferred() {
        return false
    }

}
module.exports = ServiceProvider