const url = require('url');
const querystring = require('querystring');

/**
 * Class ConfigurationUrlParser.
 */
class ConfigurationUrlParser {
    /**
     * Create a new instance.
     */
    constructor() {

        this.$driverAliases = {
            'mssql': 'sqlsrv',
            'mysql2': 'mysql', // RDS
            'postgres': 'pgsql',
            'postgresql': 'pgsql',
            'sqlite3': 'sqlite',
            'redis': 'tcp',
            'rediss': 'tls',
        };
    }

    /**
     * parseConfiguration method.
     * @param {*} config
     * @returns {any}
     */
    parseConfiguration(config: Record<string, any>) {
        if (typeof config === 'string') {
            config = { url: config };
        }
       const $url = config['url'];

        if (! $url) {
            return config;
        }
        const urlParts = this.parseUrl(config.url);
        const decodedComponents = this.parseStringsToNativeTypes(urlParts);

        return {
            ...config,
            ...this.getPrimaryOptions(decodedComponents),
            ...this.getQueryOptions(urlParts),
        };
    }

    /**
     * getPrimaryOptions method.
     * @param {*} url
     * @returns {any}
     */
    getPrimaryOptions(url: string) {
        return {
            driver: this.getDriver(url),
            database: this.getDatabase(url),
            host: url.hostname || url.host || null,
            port: url.port || null,
            username: url.username || url.user || null,
            password: url.password || url.pass || null,
        };
    }


    /**
     * getDriver method.
     * @param {*} url
     * @returns {any}
     */
    getDriver(url: string) {
        const alias = url.protocol && url.protocol.replace(':', '');

        if (!alias) {
            return null;
        }

        return this.$driverAliases[alias] || alias;
    }

    /**
     * getDatabase method.
     * @param {*} url
     * @returns {any}
     */
    getDatabase(url: string) {
        let path = url.pathname || '';
        if (path.startsWith('/')) {
            path = path.slice(1);
        }
        return path !== '' ? path : null;
    }

    /**
     * getQueryOptions method.
     * @param {*} url
     * @returns {any}
     */
    getQueryOptions(url: string) {
        const queryString = url.search ? url.search.replace(/^\?/, '') : (url.query || '');

        if (!queryString) {
            return {};
        }

        const query = querystring.parse(queryString);
        const result = {};
        for (let key in query) {
            result[key] = this.parseStringsToNativeTypes(query[key]);
        }
        return result;
    }

    /**
     * parseUrl method.
     * @param {*} url
     * @returns {any}
     */
    parseUrl(url: string) {
        url = url.replace(/^(sqlite3?):\/\//, '$1://null/');

        const parsedUrl = new URL(url);

        if (!parsedUrl) {
            throw new Error('The database configuration URL is malformed.');
        }

        return parsedUrl;
    }

    /**
     * parseStringsToNativeTypes method.
     * @param {*} value
     * @returns {any}
     */
    parseStringsToNativeTypes(value: any) {
        if (Array.isArray(value)) {
            return value.map(v => this.parseStringsToNativeTypes(v));
        }

        if (typeof value !== 'string') {
            return value;
        }

        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    get$DriverAliases() {
        return this.$driverAliases;
    }

    /**
     * addDriverAlias method.
     * @param {*} alias
     * @param {*} driver
     * @returns {any}
     */
    addDriverAlias(alias: any, driver: any) {
        this.$driverAliases[alias] = driver;
    }
}

module.exports = ConfigurationUrlParser;
