const { Macroable } = require('./macro')
const InvalidArgumentException = require('./exceptions/invalidArgumentException')
const lodash = require('lodash')
const StringHelper = require('./string')
const { isset, is_null, method_exists } = require('./function')
const MockContainer = require('./mockContainer')

/**
 * Class Manager.
 */
class Manager extends Macroable {

    /**
     * Create a new instance.
     * @param {*} application
     */
    constructor(application) {
        super()
        let $container = application || (typeof app === 'function' ? app() : new MockContainer());
        Object.defineProperties(this, {
            '$container': {
                value: $container,
                writable: true
            },
            '$config': {
                value: (typeof $container.make === 'function' ? $container.make('config') : {}) || {},
                writable: true
            },
            '$customCreators': {
                value: {},
                writable: true
            },
            '$drivers': {
                value: {},
                writable: true
            }
        })
    }

    /**
     * driver method.
     * @param {*} $driver
     * @returns {any}
     */
    driver($driver = null) {
        $driver = $driver || this.getDefaultDriver();

        if (is_null($driver)) {
            throw new InvalidArgumentException(`Unable to resolve NULL driver for [${this.constructor.name}].`);
        }

        if (!isset(this.$drivers[$driver])) {
            this.$drivers[$driver] = this.getDriver($driver);
        }

        return this.$drivers[$driver];
    }

    /**
     * getDriver method.
     * @param {*} name
     * @returns {any}
     */
    getDriver(name) {
        let $config = this.getDriverConfig(name);
        return this.resolve(name, $config);
    }

    /**
     * resolve method.
     * @param {*} $name
     * @param {*} $config
     * @returns {any}
     */
    resolve($name, $config = {}) {

        if (isset(this.$customCreators[$config['driver']])) {
            return this.callCustomCreator($config, $name);
        }

        let $driverMethod = 'create' + StringHelper.pascal($config['driver']) + 'Driver';

        if (method_exists(this, $driverMethod)) {
            return this[$driverMethod]($config, $name);
        }

        throw new InvalidArgumentException("Driver [" + $config['driver'] + "] not supported.");
    }

    /**
     * callCustomCreator method.
     * @param {*} $config
     * @param {*} $name
     * @returns {any}
     */
    callCustomCreator($config, $name) {
        return this.$customCreators[$config['driver']].call(this, this.$container, $name, $config);
    }

    /**
     * extend method.
     * @param {*} $driver
     * @param {*} $callback
     * @returns {any}
     */
    extend($driver, $callback) {
        this.$customCreators[$driver] = $callback;
        return this;
    }

    /**
     * getDrivers method.
     * @returns {any}
     */
    getDrivers() {
        return this.$drivers;
    }

    /**
     * getContainer method.
     * @returns {any}
     */
    getContainer() {
        return this.$container;
    }

    /**
     * setContainer method.
     * @param {*} $container
     * @returns {any}
     */
    setContainer($container) {
        this.$container = $container;
        return this;
    }

    /**
     * forgetDrivers method.
     * @returns {any}
     */
    forgetDrivers() {
        this.$drivers = {};
        return this;
    }

    /**
     * setDefaultDriver method.
     * @param {*} name
     * @returns {any}
     */
    setDefaultDriver(name) {
        lodash.set(this.$config, `${this.$type}.default`, name)
    }

    /**
     * getDefaultDriver method.
     * @returns {any}
     */
    getDefaultDriver() {
        return lodash.get(this.$config, `${this.$type}.default`);
    }

    /**
     * getConfig method.
     * @param {*} name
     * @param {*} defaultValue
     * @returns {any}
     */
    getConfig(name, defaultValue) {
        return lodash.get(this.$config, `${this.$type}.${name}`, defaultValue)
    }

    /**
     * getDriverConfig method.
     * @param {*} name
     * @returns {any}
     */
    getDriverConfig(name) {
        return lodash.get(this.$config, `${this.$type}.drivers.${name}`);
    }

    /**
     * __call method.
     * @param {*} target
     * @param {*} $method
     * @param {*} $parameters
     * @returns {any}
     */
    __call(target, $method, $parameters) {
        return target.driver()[$method](...$parameters);
    }
}

module.exports = Manager