export function formatCurrency(
	value: number | bigint | string | undefined,
	currency = 'AUD',
	decimalPlaces?: number
) {
	let numberValue: number | bigint;
	if (typeof value === 'undefined') {
		numberValue = 0;
	} else if (typeof value === 'string') {
		numberValue = Number(value);
	} else {
		numberValue = value;
	}

	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
	}).format(numberValue);
}

export function formatNumber(value: number, compact = false) {
	const formatter = new Intl.NumberFormat(undefined, {
		notation: compact ? 'compact' : 'standard',
	});
	return formatter.format(value);
}
