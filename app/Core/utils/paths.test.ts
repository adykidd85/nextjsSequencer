import { injectPathParams } from './paths';

describe('injectPathParams', () => {
	test.each([
		{ path: '/conversr/campaigns/:id', params: { id: '1' }, expected: '/conversr/campaigns/1' },
		{
			path: '/conversr/:id/campaigns/:id2',
			params: { id: '1', id2: '2' },
			expected: '/conversr/1/campaigns/2',
		},
		{
			path: 'https://:subdomain.burstage.com/conversr/campaigns/:id',
			params: { subdomain: 'aigent' },
			expected: 'https://aigent.burstage.com/conversr/campaigns/:id',
		},
	])(`should return "$expected" when given "$path" and $params`, ({ path, params, expected }) => {
		expect(injectPathParams(path, params)).toBe(expected);
	});
});
