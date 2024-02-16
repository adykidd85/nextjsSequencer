// Unicode mapping table for GSM 03.38
// Source: https://www.unicode.org/Public/MAPPINGS/ETSI/GSM0338.TXT
// These characters are encoded as 7 bits (1 character) in length
const gsmCodePoints = new Set([
	0x0040, // COMMERCIAL AT
	0x0000, // NULL (see note above)
	0x00a3, // POUND SIGN
	0x0024, // DOLLAR SIGN
	0x00a5, // YEN SIGN
	0x00e8, // LATIN SMALL LETTER E WITH GRAVE
	0x00e9, // LATIN SMALL LETTER E WITH ACUTE
	0x00f9, // LATIN SMALL LETTER U WITH GRAVE
	0x00ec, // LATIN SMALL LETTER I WITH GRAVE
	0x00f2, // LATIN SMALL LETTER O WITH GRAVE
	0x00e7, // LATIN SMALL LETTER C WITH CEDILLA
	0x00c7, // LATIN CAPITAL LETTER C WITH CEDILLA (see note above)
	0x000a, // LINE FEED
	0x00d8, // LATIN CAPITAL LETTER O WITH STROKE
	0x00f8, // LATIN SMALL LETTER O WITH STROKE
	0x000d, // CARRIAGE RETURN
	0x00c5, // LATIN CAPITAL LETTER A WITH RING ABOVE
	0x00e5, // LATIN SMALL LETTER A WITH RING ABOVE
	0x0394, // GREEK CAPITAL LETTER DELTA
	0x005f, // LOW LINE
	0x03a6, // GREEK CAPITAL LETTER PHI
	0x0393, // GREEK CAPITAL LETTER GAMMA
	0x039b, // GREEK CAPITAL LETTER LAMDA
	0x03a9, // GREEK CAPITAL LETTER OMEGA
	0x03a0, // GREEK CAPITAL LETTER PI
	0x03a8, // GREEK CAPITAL LETTER PSI
	0x03a3, // GREEK CAPITAL LETTER SIGMA
	0x0398, // GREEK CAPITAL LETTER THETA
	0x039e, // GREEK CAPITAL LETTER XI
	0x00a0, // ESCAPE TO EXTENSION TABLE (or displayed as NBSP, see note above)
	0x00c6, // LATIN CAPITAL LETTER AE
	0x00e6, // LATIN SMALL LETTER AE
	0x00df, // LATIN SMALL LETTER SHARP S (German)
	0x00c9, // LATIN CAPITAL LETTER E WITH ACUTE
	0x0020, // SPACE
	0x0021, // EXCLAMATION MARK
	0x0022, // QUOTATION MARK
	0x0023, // NUMBER SIGN
	0x00a4, // CURRENCY SIGN
	0x0025, // PERCENT SIGN
	0x0026, // AMPERSAND
	0x0027, // APOSTROPHE
	0x0028, // LEFT PARENTHESIS
	0x0029, // RIGHT PARENTHESIS
	0x002a, // ASTERISK
	0x002b, // PLUS SIGN
	0x002c, // COMMA
	0x002d, // HYPHEN-MINUS
	0x002e, // FULL STOP
	0x002f, // SOLIDUS
	0x0030, // DIGIT ZERO
	0x0031, // DIGIT ONE
	0x0032, // DIGIT TWO
	0x0033, // DIGIT THREE
	0x0034, // DIGIT FOUR
	0x0035, // DIGIT FIVE
	0x0036, // DIGIT SIX
	0x0037, // DIGIT SEVEN
	0x0038, // DIGIT EIGHT
	0x0039, // DIGIT NINE
	0x003a, // COLON
	0x003b, // SEMICOLON
	0x003c, // LESS-THAN SIGN
	0x003d, // EQUALS SIGN
	0x003e, // GREATER-THAN SIGN
	0x003f, // QUESTION MARK
	0x00a1, // INVERTED EXCLAMATION MARK
	0x0041, // LATIN CAPITAL LETTER A
	0x0391, // GREEK CAPITAL LETTER ALPHA
	0x0042, // LATIN CAPITAL LETTER B
	0x0392, // GREEK CAPITAL LETTER BETA
	0x0043, // LATIN CAPITAL LETTER C
	0x0044, // LATIN CAPITAL LETTER D
	0x0045, // LATIN CAPITAL LETTER E
	0x0395, // GREEK CAPITAL LETTER EPSILON
	0x0046, // LATIN CAPITAL LETTER F
	0x0047, // LATIN CAPITAL LETTER G
	0x0048, // LATIN CAPITAL LETTER H
	0x0397, // GREEK CAPITAL LETTER ETA
	0x0049, // LATIN CAPITAL LETTER I
	0x0399, // GREEK CAPITAL LETTER IOTA
	0x004a, // LATIN CAPITAL LETTER J
	0x004b, // LATIN CAPITAL LETTER K
	0x039a, // GREEK CAPITAL LETTER KAPPA
	0x004c, // LATIN CAPITAL LETTER L
	0x004d, // LATIN CAPITAL LETTER M
	0x039c, // GREEK CAPITAL LETTER MU
	0x004e, // LATIN CAPITAL LETTER N
	0x039d, // GREEK CAPITAL LETTER NU
	0x004f, // LATIN CAPITAL LETTER O
	0x039f, // GREEK CAPITAL LETTER OMICRON
	0x0050, // LATIN CAPITAL LETTER P
	0x03a1, // GREEK CAPITAL LETTER RHO
	0x0051, // LATIN CAPITAL LETTER Q
	0x0052, // LATIN CAPITAL LETTER R
	0x0053, // LATIN CAPITAL LETTER S
	0x0054, // LATIN CAPITAL LETTER T
	0x03a4, // GREEK CAPITAL LETTER TAU
	0x0055, // LATIN CAPITAL LETTER U
	0x0056, // LATIN CAPITAL LETTER V
	0x0057, // LATIN CAPITAL LETTER W
	0x0058, // LATIN CAPITAL LETTER X
	0x03a7, // GREEK CAPITAL LETTER CHI
	0x0059, // LATIN CAPITAL LETTER Y
	0x03a5, // GREEK CAPITAL LETTER UPSILON
	0x005a, // LATIN CAPITAL LETTER Z
	0x0396, // GREEK CAPITAL LETTER ZETA
	0x00c4, // LATIN CAPITAL LETTER A WITH DIAERESIS
	0x00d6, // LATIN CAPITAL LETTER O WITH DIAERESIS
	0x00d1, // LATIN CAPITAL LETTER N WITH TILDE
	0x00dc, // LATIN CAPITAL LETTER U WITH DIAERESIS
	0x00a7, // SECTION SIGN
	0x00bf, // INVERTED QUESTION MARK
	0x0061, // LATIN SMALL LETTER A
	0x0062, // LATIN SMALL LETTER B
	0x0063, // LATIN SMALL LETTER C
	0x0064, // LATIN SMALL LETTER D
	0x0065, // LATIN SMALL LETTER E
	0x0066, // LATIN SMALL LETTER F
	0x0067, // LATIN SMALL LETTER G
	0x0068, // LATIN SMALL LETTER H
	0x0069, // LATIN SMALL LETTER I
	0x006a, // LATIN SMALL LETTER J
	0x006b, // LATIN SMALL LETTER K
	0x006c, // LATIN SMALL LETTER L
	0x006d, // LATIN SMALL LETTER M
	0x006e, // LATIN SMALL LETTER N
	0x006f, // LATIN SMALL LETTER O
	0x0070, // LATIN SMALL LETTER P
	0x0071, // LATIN SMALL LETTER Q
	0x0072, // LATIN SMALL LETTER R
	0x0073, // LATIN SMALL LETTER S
	0x0074, // LATIN SMALL LETTER T
	0x0075, // LATIN SMALL LETTER U
	0x0076, // LATIN SMALL LETTER V
	0x0077, // LATIN SMALL LETTER W
	0x0078, // LATIN SMALL LETTER X
	0x0079, // LATIN SMALL LETTER Y
	0x007a, // LATIN SMALL LETTER Z
	0x00e4, // LATIN SMALL LETTER A WITH DIAERESIS
	0x00f6, // LATIN SMALL LETTER O WITH DIAERESIS
	0x00f1, // LATIN SMALL LETTER N WITH TILDE
	0x00fc, // LATIN SMALL LETTER U WITH DIAERESIS
	0x00e0, // LATIN SMALL LETTER A WITH GRAVE
]);

// Unicode mapping table for GSM 03.38 Extended Character Set
// Source: https://www.unicode.org/Public/MAPPINGS/ETSI/GSM0338.TXT
// These characters are encoded as 16 bits (2 characters) in length
const gsmExtendedCodePoints = new Set([
	0x000c, // FORM FEED
	0x005e, // CIRCUMFLEX ACCENT
	0x007b, // LEFT CURLY BRACKET
	0x007d, // RIGHT CURLY BRACKET
	0x005c, // REVERSE SOLIDUS
	0x005b, // LEFT SQUARE BRACKET
	0x007e, // TILDE
	0x005d, // RIGHT SQUARE BRACKET
	0x007c, // VERTICAL LINE
	0x20ac, // EURO SIGN
]);

// TODO: Currently, the maximum number of parts is 4 due to limitations in the PHP code. This will be increased soon.
const MAX_PARTS = 4;

const singleGsmMessageLength = 160;
const multiGsmMessageLength = 153;
const maxGsmMessageLength = MAX_PARTS * multiGsmMessageLength;

const singleUcs2MessageLength = 70;
const multiUcs2MessageLength = 67;
const maxUcs2MessageLength = MAX_PARTS * multiUcs2MessageLength;

/**
 *  Check if a message is a GSM 03.38 encoded message.
 *  If every character in the message is in the GSM 03.38 character set, then each character will only take up 7 bits.
 *  If any character is not in the GSM 03.38 character set, then each character will take up 16 bits as it will become UCS-2 encoded.
 *
 *  Reference: https://en.wikipedia.org/wiki/GSM_03.38 & https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding
 *
 * @param message the string to check if it is a GSM 03.38 encoded message
 * @returns true if the message is a GSM 03.38 encoded message, otherwise false
 */
export const isGsmMessage = (message: string): boolean => {
	for (const s of message) {
		const codePoint = s.codePointAt(0);
		if (codePoint && !gsmCodePoints.has(codePoint) && !gsmExtendedCodePoints.has(codePoint)) {
			return false;
		}
	}

	return true;
};

/**
 * Get the length of a message in characters.
 *
 * For GSM 03.38 encoded messages, each character is 7 bits (1 character) long.
 * For GSM Extended Character Set each character is 16 bits (2 characters) long.
 * For UCS-2 each character is 16 bits (1 character) long
 * so the SMS part lenght is less but character count remains 1 character.
 *
 * @param message the message to get the length of
 * @param isGsm true if the message is a GSM 03.38 encoded message, otherwise false
 * @returns the length of the message in characters
 */
const getMessageLength = (message: string, isGsm: boolean): number => {
	if (!isGsm) {
		return message.length;
	}

	let messageLength = 0;

	for (const s of message) {
		const codePoint = s.codePointAt(0);
		if (codePoint) {
			if (gsmExtendedCodePoints.has(codePoint)) {
				messageLength += 2;
			} else {
				messageLength += 1;
			}
		}
	}

	return messageLength;
};

/**
 * Get the number of parts a message will be split into.
 *
 * For GSM 03.38 encoded messages, each part is 160 characters long.
 * For GSM Extended Character Set and UCS-2 encoded messages,
 * each part is 70 characters long.
 * For messages which are longer than the initial part length,
 * a User Data Header (UDH) is added to the message which takes up 6 characters.
 *
 * @param messageLength the length of the message in characters
 * @param isGsm true if the message is a GSM 03.38 encoded message, otherwise false
 * @returns the number of parts the message will be split into
 */
const getMessageParts = (messageLength: number, isGsm: boolean): number => {
	const singleSmsPartLength = isGsm ? singleGsmMessageLength : singleUcs2MessageLength;
	const multiSmsPartLength = isGsm ? multiGsmMessageLength : multiUcs2MessageLength;

	if (messageLength <= singleSmsPartLength) {
		return 1;
	}

	return Math.ceil(messageLength / multiSmsPartLength);
};

export type MessageData = {
	length: number;
	maxLength: number;
	parts: number;
	maxParts: number;
	isGsm: boolean;
};

/**
 * Get the length, number of parts and encoding of a message.
 *
 * @param message the message
 * @returns the length, number of parts and encoding of a message.
 */
export const getMessageData = (message: string): MessageData => {
	const isGsm = isGsmMessage(message);
	const length = getMessageLength(message, isGsm);
	const parts = getMessageParts(length, isGsm);

	return {
		length,
		maxLength: isGsm ? maxGsmMessageLength : maxUcs2MessageLength,
		parts,
		maxParts: MAX_PARTS,
		isGsm,
	};
};
