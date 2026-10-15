const RuntimeExceptionContract = require('@ostro/contracts/exception/runtimeException')
/**
 * Class RuntimeException.
 */
class RuntimeException extends RuntimeExceptionContract {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.message = message || 'Runtime Error';
        this.statusCode = 500
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = RuntimeException