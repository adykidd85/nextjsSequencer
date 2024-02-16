import { getShade } from './colors';

describe('getShade', () => {
	test.each([
		{ color: '#00aec5', factor: 0.1, expected: '#e5f6f8' },
		{ color: '#00aec5', factor: 0.3, expected: '#b2e6ed' },
		{ color: '#00aec5', factor: 0.6, expected: '#66cedc' },
		{ color: '#00aec5', factor: 0.9, expected: '#19b5ca' },
		{ color: '#bada55', factor: 0.1, expected: '#f7faed' },
		{ color: '#096961', factor: 0.1, expected: '#e5efee' },
	])(
		`should return "$expected" for "$color" factored by "$factor"`,
		({ color, factor, expected }) => {
			expect(getShade(color, factor)).toBe(expected);
		}
	);
});
