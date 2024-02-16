import { isNil, padStart } from 'lodash-es';

const colorHexPartsRegExp = /([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i;

/**
 * Returns the colour shifted by the given factor
 * Copied from the TransmitSMS PHP codebase
 *
 * @param color A hex colour string
 * @param factor The factor to shift the colour by (0.0 - 1.0)
 */
export function getShade(color: string, factor: number) {
	const hexParts = color.match(colorHexPartsRegExp)?.slice(1);
	if (isNil(hexParts)) return color;

	const newColor = hexParts.map((hexValue) => {
		const value = parseInt(hexValue, 16);
		const shade = Math.floor(value * factor) + Math.floor(255 * (1 - factor));
		const newHexValue = shade.toString(16);
		return padStart(newHexValue, 2, '0');
	});

	return `#${newColor.join('')}`;
}
