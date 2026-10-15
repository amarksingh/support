/**
 * Class MockContainer.
 */
class MockContainer {
    bindings = {};

    /**
     * make method.
     * @param {*} abstract
     * @returns {any}
     */
    make(abstract: any) {
        if (typeof this.bindings[abstract] === 'function') {
            return this.bindings[abstract](this);
        }
        return this.bindings[abstract] || {};
    }

    /**
     * bind method.
     * @param {*} abstract
     * @param {*} concrete
     * @returns {any}
     */
    bind(abstract: any, concrete: any) {
        this.bindings[abstract] = concrete;
    }
}

module.exports = MockContainer;
