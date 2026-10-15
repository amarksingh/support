const PageNotFoundExceptionContract = require('@ostro/contracts/http/pageNotFoundException')
/**
 * Class PageNotFoundException.
 */
class PageNotFoundException extends PageNotFoundExceptionContract {
    /**
     * Create a new instance.
     * @param {*} error
     */
    constructor(error: any) {
        super();
        this.name = this.constructor.name;
        this.message = 'Page Not Found Exception';
        this.error = error;
        this.statusCode = 404;
        Error.captureStackTrace(this, this.constructor);

    }
}
module.exports = PageNotFoundException