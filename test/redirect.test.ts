const Redirect = require('../redirect');
const RedirectResponse = require('@ostro/http/redirectResponse');

describe('Redirect', () => {
    test('__get proxies calls to RedirectResponse instance', () => {
        const res = Redirect.to('/home');
        expect(res).toBeInstanceOf(RedirectResponse);
    });
});
