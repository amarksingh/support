const Facade = require('../facades/facade');
const AppFacade = require('../facades/app');
const CacheFacade = require('../facades/cache');
const DateFacade = require('../facades/date');
const SchemaFacade = require('../facades/schema');
const AssistantFacade = require('../facades/assistant');
const CarbonFacade = require('../facades/carbon');
const ConfigFacade = require('../facades/config');
const CryptFacade = require('../facades/crypt');
const DatabaseFacade = require('../facades/database');
const EventFacade = require('../facades/event');
const ExceptionFacade = require('../facades/exception');
const HashFacade = require('../facades/hash');
const LogFacade = require('../facades/log');
const MailFacade = require('../facades/mail');
const RateLimiterFacade = require('../facades/rateLimiter');
const RouteFacade = require('../facades/route');
const SessionFacade = require('../facades/session');
const StorageFacade = require('../facades/storage');
const ValidatorFacade = require('../facades/validator');

const InvalidFacadeAccessor = require('../facades/exceptions/invalidFacadeAccessor');
const RuntimeException = require('../exceptions/runtimeException');

describe('Facades', () => {
    let mockApp;

    beforeEach(() => {
        mockApp = {
            cache: {
                get: jest.fn((k) => 'cached_' + k),
                set: jest.fn()
            },
            date: {
                now: jest.fn(() => 'now_date')
            },
            db: {
                connection: jest.fn(() => ({
                    getSchemaBuilder: () => 'schema_builder'
                }))
            },
            'db.schema': {
                hasTable: jest.fn(() => true)
            },
            instance: jest.fn((key, inst) => {
                mockApp[key] = inst;
            }),
            resolved: jest.fn((accessor) => true),
            afterResolving: jest.fn((accessor, cb) => {
                cb(mockApp[accessor]);
            })
        };
        Facade.setFacadeApplication(mockApp);
        Facade.clearResolvedInstances();
    });

    afterEach(() => {
        Facade.clearResolvedInstances();
        Facade.setFacadeApplication(null);
    });

    test('getFacadeAccessor base throws RuntimeException', () => {
        expect(() => {
            Facade.getFacadeAccessor();
        }).toThrow(RuntimeException);
    });

    test('Facade application getter and setter', () => {
        expect(Facade.getFacadeApplication()).toBe(mockApp);
    });

    test('calls resolved callbacks', () => {
        const cb = jest.fn();
        CacheFacade.resolved(cb);
        expect(cb).toHaveBeenCalled();
    });

    test('resolved callback when not yet resolved', () => {
        mockApp.resolved = jest.fn(() => false);
        const cb = jest.fn();
        CacheFacade.resolved(cb);
        expect(cb).toHaveBeenCalledWith(mockApp.cache);
    });

    test('swap and clearResolvedInstance', () => {
        const dummyCache = { get: () => 'swapped' };
        CacheFacade.swap(dummyCache);
        expect(CacheFacade.get('key')).toBe('swapped');

        mockApp.cache = { get: (k) => 'cached_' + k };
        CacheFacade.clearResolvedInstance('cache');
        expect(CacheFacade.get('key')).toBe('cached_key');
    });

    test('resolveFacadeInstance with object or non-cached flag', () => {
        const directObj = { test: 123 };
        expect(Facade.resolveFacadeInstance(directObj)).toBe(directObj);

        // test $cached = false
        class NonCachedFacade extends Facade {
            static $cached = false;
            static getFacadeAccessor() {
                return 'cache';
            }
        }
        NonCachedFacade.resolveFacadeInstance('cache');
        // second call with $cached = false
        const instance = NonCachedFacade.resolveFacadeInstance('cache');
        expect(instance).toBe(mockApp.cache);
    });

    test('InvalidFacadeAccessor thrown when root is null', () => {
        class BrokenFacade extends Facade {
            static getFacadeAccessor() {
                return 'non_existent_service';
            }
        }
        const WrappedBroken = require('../macro').Macroable(BrokenFacade);
        expect(() => {
            WrappedBroken.someMethod();
        }).toThrow(InvalidFacadeAccessor);
    });

    test('AppFacade __get proxies to $app', () => {
        mockApp.testMethod = jest.fn(() => 'app_ok');
        expect(AppFacade.testMethod()).toBe('app_ok');
    });

    test('DateFacade default fallback when not set in app', () => {
        Facade.setFacadeApplication({});
        Facade.clearResolvedInstances();
        expect(DateFacade.now).toBeDefined();
    });

    test('SchemaFacade connection method', () => {
        expect(SchemaFacade.connection('mysql')).toBe('schema_builder');
    });

    test('All other facade accessors', () => {
        expect(AssistantFacade.getFacadeAccessor()).toBe('@ostro/contracts/console/kernel');
        expect(CarbonFacade.getFacadeAccessor()).toBe('carbon');
        expect(ConfigFacade.getFacadeAccessor()).toBe('config');
        expect(CryptFacade.getFacadeAccessor()).toBe('encrypter');
        expect(DatabaseFacade.getFacadeAccessor()).toBe('db');
        expect(EventFacade.getFacadeAccessor()).toBe('event');
        expect(ExceptionFacade.getFacadeAccessor()).toBe('exceptionHandler');
        expect(HashFacade.getFacadeAccessor()).toBe('hash');
        expect(LogFacade.getFacadeAccessor()).toBe('logger');
        expect(MailFacade.getFacadeAccessor()).toBe('mailer');
        expect(RateLimiterFacade.getFacadeAccessor()).toBeDefined();
        expect(RouteFacade.getFacadeAccessor()).toBe('router');
        expect(SchemaFacade.getFacadeAccessor()).toBe('db.schema');
        expect(SessionFacade.getFacadeAccessor()).toBe('session');
        expect(StorageFacade.getFacadeAccessor()).toBe('filesystem');
        expect(ValidatorFacade.getFacadeAccessor()).toBe('validation');
    });

    test('InvalidFacadeAccessor exception properties', () => {
        const err = new InvalidFacadeAccessor('custom');
        expect(err.name).toBe('InvalidFacadeAccessor');
        expect(err.status).toBe(500);
        expect(err.message).toContain('custom');
    });
});
