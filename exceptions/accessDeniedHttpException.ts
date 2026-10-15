const AccessDeniedHttpExceptionInterface = require('@ostro/contracts/http/accessDeniedHttpException')
/**
 * Class AccessDeniedHttpException.
 */
class AccessDeniedHttpException extends Error {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AccessDeniedHttpException