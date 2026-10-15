const MethodNotAvailableContract = require('@ostro/contracts/http/methodNotAvailable')
/**
 * Class MethodNotAvailable.
 */
class MethodNotAvailable extends MethodNotAvailableContract {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message) {
        super();
        this.name = this.constructor.name;
        this.message =  message;
        this.statusCode = 500;
        Error.captureStackTrace(this, this.constructor);

    }
}
module.exports = MethodNotAvailable