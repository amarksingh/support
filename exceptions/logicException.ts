/**
 * Class LogicException.
 */
class LogicException extends Error {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.code = 'LOGIC_ERROR';
        this.message = message;
        this.statusCode = 500
    }
}
module.exports = LogicException