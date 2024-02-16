import { getCountryName, type CountryCode } from './countries';

describe('getCountryName', () => {
	test.each([
		{ value: 'AU', expected: 'Australia' },
		{ value: 'GB', expected: 'United Kingdom' },
		{ value: 'US', expected: 'United States' },
		{ value: 'IN', expected: 'India' },
		{ value: 'ZZ', expected: 'ZZ' },
	])(`should return $expected for $value`, ({ value, expected }) => {
		expect(getCountryName(value as CountryCode)).toBe(expected);
	});
});
