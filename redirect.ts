const RedirectResponse = require('@ostro/http/redirectResponse')
const { Macroable } = require('./macro')
class Redirect {
    static __get(target, method) {
        return this.make(new RedirectResponse(), method)
    }
}
module.exports = Macroable(Redirect)