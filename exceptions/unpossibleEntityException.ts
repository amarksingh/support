/**
 * Class UnpossibleEntityException.
 */
class UnpossibleEntityException {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        this.name = this.constructor.name;
        this.message = message || 'Unpossible Entity Exception';
        this.statusCode = 422;
        Error.captureStackTrace(this, this.constructor);

    }
}
module.exports = UnpossibleEntityException