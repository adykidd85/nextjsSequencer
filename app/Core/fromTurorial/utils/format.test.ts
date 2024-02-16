import { formatCurrency, formatNumber } from './format';

describe('formatCurrency', () => {
	test.each([
		{ value: 0, currency: 'AUD', expected: '$0.00' },
		{ value: 12.3457, currency: 'USD', expected: '$12.35' },
		{ value: 12.3457, currency: 'USD', decimals: 3, expected: '$12.346' },
		{ value: 100, currency: 'GBP', expected: '£100.00' },
		{ value: 55.55, currency: undefined, expected: '$55.55' },
		{ value: '55.55', expected: '$55.55' },
		{ value: undefined, expected: '$0.00' },
	])(
		`should return $expected for $value and $currency`,
		({ value, currency, decimals, expected }) => {
			expect(formatCurrency(value, currency, decimals)).toBe(expected);
		}
	);
});

describe('formatNumber', () => {
	test.each([
		{ input: 1_911, expected: '1,911' },
		{ input: 10_561, expected: '10,561' },
		{ input: 123_111, expected: '123,111' },
		{ input: 123_456_789, expected: '123,456,789' },
		{ input: 1_123_456_789, expected: '1,123,456,789' },
	])(`renders $expected for large number $input`, ({ input, expected }) => {
		expect(formatNumber(input)).toBe(expected);
	});

	test.each([
		{ input: 1_911, expected: '1.9K' },
		{ input: 10_161, expected: '10K' },
		{ input: 10_561, expected: '11K' },
		{ input: 123_111, expected: '123K' },
		{ input: 999_100, expected: '999K' },
		{ input: 999_999, expected: '1M' },
		{ input: 123_456_789, expected: '123M' },
		{ input: 1_123_456_789, expected: '1.1B' },
		{ input: 34_123_456_789, expected: '34B' },
	])(`renders compacted $expected for large number $input`, ({ input, expected }) => {
		expect(formatNumber(input, true)).toBe(expected);
	});
});
