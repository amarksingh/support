const InvalidArgumentExceptionContract = require('@ostro/contracts/exception/invalidArgumentException')
/**
 * Class InvalidArgumentException.
 */
class InvalidArgumentException extends InvalidArgumentExceptionContract {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.code = 'ERR_INVALID_ARG_VALUE';
        this.message = message || 'Invalid Argument';
        this.statusCode = 500
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = InvalidArgumentException