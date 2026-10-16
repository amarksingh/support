const _Redirect = require('../redirect');
const Redirect = _Redirect.default || _Redirect;
const RedirectResponse = require('@ostro/http/redirectResponse');

describe('Redirect', () => {
    test('__get proxies calls to RedirectResponse instance', () => {
        const res = Redirect.to('/home');
        expect(res).toBeInstanceOf(RedirectResponse);
    });
});
