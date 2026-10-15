const { DateTime: LuxonDateTime } = require("luxon");
const InvalidArgumentException = require('./exceptions/invalidArgumentException');
const { is_callable, is_object, is_string } = require('./function');
/**
 * Class DateTime.
 */
class DateTime extends Date {
    static DEFAULT_CLASS_NAME = LuxonDateTime;

    static $callable = null;

    static $factory = null;

    static $dateClass = null;

    /**
     * getTimeZone method.
     * @static
     * @returns {any}
     */
    static getTimeZone() {
        return process.env.TZ
    }

    /**
     * Get DATE_TIME.
     * @returns {any}
     */
    get DATE_TIME() {
        if (!this.DATE_TIME_CACHED) {
            Object.defineProperty(this, 'DATE_TIME_CACHED', {
                writable: true,
                enumerable: false,
                value: this.constructor.DEFAULT_CLASS_NAME.utc().setZone(this.constructor.getTimeZone())
            })
        }
        return this.DATE_TIME_CACHED
    }

    /**
     * Set DATE_TIME.
     * @param {*} value
     */
    set DATE_TIME(value) {
        Object.defineProperty(this, 'DATE_TIME_CACHED', {
            writable: true,
            enumerable: false,
            value: value
        })
    }
    /**
     * Create a new instance.
     * @param {*} date
     */
    constructor(date) {

        super(...arguments);

        if (date instanceof this.constructor || date instanceof LuxonDateTime) {
            this.DATE_TIME = date
        }
        if (date instanceof Date) {
            this.DATE_TIME = this.constructor.DEFAULT_CLASS_NAME.fromISO(date.toISOString())
        }

    }

    /**
     * create method.
     * @param {*} $year
     * @param {*} $month
     * @param {*} $day
     * @param {*} $hour
     * @param {*} $minute
     * @param {*} $second
     * @param {*} $tz
     * @returns {any}
     */
    create($year = 0, $month = 0, $day = 0, $hour = 0, $minute = 0, $second = 0, $tz = null) {
        return this.constructor.DEFAULT_CLASS_NAME.utc($year, $month, $day, $hour, $minute, $second).setZone($tz || this.constructor.getTimeZone())
    }

    /**
     * createFromDate method.
     * @param {*} $year
     * @param {*} $month
     * @param {*} $day
     * @param {*} $tz
     * @returns {any}
     */
    createFromDate($year = null, $month = null, $day = null, $tz = null) {
        return this.constructor.DEFAULT_CLASS_NAME.utc($year, $month, $day, 0, 0, 0).setZone($tz || this.constructor.getTimeZone())
    }

    /**
     * createFromFormat method.
     * @param {*} $format
     * @param {*} $time
     * @param {*} $tz
     * @returns {any}
     */
    createFromFormat($format, $time, $tz = null) {
        return this.constructor.DEFAULT_CLASS_NAME.fromFormat($time, $format, { setZone: $tz || this.constructor.getTimeZone() })
    }

    /**
     * createFromTime method.
     * @param {*} $hour
     * @param {*} $minute
     * @param {*} $second
     * @param {*} $tz
     * @returns {any}
     */
    createFromTime($hour = 0, $minute = 0, $second = 0, $tz = null) {
        let now = this.constructor.DEFAULT_CLASS_NAME.utc().setZone($tz || this.constructor.getTimeZone());
        return now.set({ hour: $hour, minute: $minute, second: $second, millisecond: 0 });
    }

    /**
     * getTime method.
     * @returns {any}
     */
    getTime() {
        return this.toString()
    }

    /**
     * now method.
     * @static
     * @returns {any}
     */
    static now() {
        return (new this).now()
    }

    /**
     * utc method.
     * @returns {any}
     */
    utc() {
        const date = this.constructor.DEFAULT_CLASS_NAME.utc();
        return this.newDate(date)
    }

    /**
     * now method.
     * @param {*} $tz
     * @returns {any}
     */
    now($tz = null) {
        let date = this.constructor.DEFAULT_CLASS_NAME.utc().setZone(this.constructor.getTimeZone())
        if ($tz)
            date = date.setZone($tz);
        return this.newDate(date);
    }

    /**
     * add method.
     * @param {*} date
     * @returns {any}
     */
    add(date) {
        let diff = {};
        if (date instanceof this.constructor) {
            diff = date.DATE_TIME.diff(this.DATE_TIME);

        }
        if (date instanceof LuxonDateTime) {
            diff = date.diff(this.DATE_TIME);
        }
        return this.plus(diff.milliseconds)
    }

    /**
     * plus method.
     * @param {*} obj
     * @returns {any}
     */
    plus(obj) {
        const date = this.clone(this.DATE_TIME)
        return this.newDate(date.plus(obj));
    }

    /**
     * addSeconds method.
     * @param {*} value
     * @returns {any}
     */
    addSeconds(value) {
        return this.plus({ seconds: value });
    }

    /**
     * addMinutes method.
     * @param {*} value
     * @returns {any}
     */
    addMinutes(value) {
        return this.plus({ minutes: value });
    }

    /**
     * addHours method.
     * @param {*} value
     * @returns {any}
     */
    addHours(value) {
        return this.plus({ hours: value });
    }

    /**
     * addDays method.
     * @param {*} value
     * @returns {any}
     */
    addDays(value) {
        return this.plus({ days: value });
    }

    /**
     * addWeeks method.
     * @param {*} value
     * @returns {any}
     */
    addWeeks(value) {
        return this.plus({ weeks: value });
    }

    /**
     * addYears method.
     * @param {*} value
     * @returns {any}
     */
    addYears(value) {
        return this.plus({ years: value });
    }

    /**
     * format method.
     * @param {*} format
     * @returns {any}
     */
    format(format) {
        return this.DATE_TIME.toFormat(format).toString()
    }

    /**
     * getTimestamp method.
     * @returns {any}
     */
    getTimestamp() {
        return this.DATE_TIME.ts
    }

    /**
     * use method.
     * @static
     * @param {*} $handler
     * @returns {any}
     */
    static use($handler) {
        if (is_callable($handler)) {
            return this.useCallable($handler);
        } else if (is_string($handler)) {
            return this.useClass($handler);
        }
        throw new InvalidArgumentException('Invalid date creation handler. Please provide a class name, callable, or Carbon factory.');
    }

    /**
     * useDefault method.
     * @static
     * @returns {any}
     */
    static useDefault() {
        this.$callable = null;
        this.$factory = null;
        this.$dateClass = null;
    }

    /**
     * useCallable method.
     * @static
     * @param {*} $callable
     * @returns {any}
     */
    static useCallable($callable) {
        this.$callable = $callable;
        this.$factory = null;
        this.$dateClass = null;
    }

    /**
     * useClass method.
     * @static
     * @param {*} $dateClass
     * @returns {any}
     */
    static useClass($dateClass) {
        this.$dateClass = $dateClass;
        this.$factory = null;
        this.$callable = null;
    }

    /**
     * useFactory method.
     * @static
     * @param {*} $factory
     * @returns {any}
     */
    static useFactory($factory) {
        this.$factory = $factory;
        this.$callable = null;
        this.$dateClass = null;
    }

    /**
     * clone method.
     * @param {*} date
     * @returns {any}
     */
    clone(date) {
        return new this.constructor.DEFAULT_CLASS_NAME(date)
    }

    /**
     * newDate method.
     * @param {*} date
     * @returns {any}
     */
    newDate(date) {
        return new this.constructor(date)
    }

    /**
     * toString method.
     * @returns {any}
     */
    toString() {
        return this.DATE_TIME.toFormat('yyyy-MM-dd HH:mm:ss');
    }

}

module.exports = DateTime
