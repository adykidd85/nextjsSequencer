import { getMessageData, isGsmMessage, MessageData } from './gsm0338';

/**
 * Expected SMS Parts to Message Length
 * Tool to check manually: https://twiliodeved.github.io/message-segment-calculator/
 * Text generator: https://www.blindtextgenerator.com/lorem-ipsum
 * 
 * GSM
 * 1 => 160
 * 2 => 306
 * 3 => 459
 * 4 => 612
 * 5 => 765
 * 6 => 918
 *
 * UCS2
 * 1 => 70
 * 2 => 134
 * 3 => 201
 * 4 => 268
 * 5 => 335
 * 6 => 402
 */
const MAX_PARTS = 4;
const maxGsmMessageLength = MAX_PARTS * 153;
const maxUcs2MessageLength = MAX_PARTS * 67;

// Test for GSM Standard
const gsmStandard = 'Hello World';
// Test for 1 SMS part GSM Standard
const gsm1Part = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.';
// Test for 4 SMS parts GSM Standard
const gsm4Parts = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat v';
// Test for 6 SMS parts GSM Standard
const gsm6Parts = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condi';
// Test for 1 SMS part GSM Extended
const gsmExtended = '[]{}^~|€\\\f';
// Test for 1 SMS part with newline
const gsmWithNewLine = 'Hello\nWorld';

// Test for UCS-2
const ucs2 = '你好世界';
// Test for 1 SMS part UCS-2
const ucs21Part = '你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。我们需要重复几次来填满这条消息。我们需要重复几次来填满这条消息。最后几个字。';
// Test for 4 SMS parts UCS-2
const ucs24Parts = '你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。这是一条中文测试信息。。';
// Test for 6 SMS parts UCS-2
const ucs26Parts = '你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这是一条中文测试信息。我们需要重复几次来填满这条消息。你好世界，这一条还需要这最后几个字。';
// Test for 1 SMS part with emoji
const ucs2WithEmoji = '你好世界 😊';
// Test for mix of GSM and UCS-2
const mixGsmUcs2 = 'Hello World 你好世界';
// Test for mix of GSM and UCS-2 with emoji
const mixGsmUcs2Emoji = 'Hello World 你好世界 😊';

describe('isGsmMessage', () => {
	test.each([
		{ message: gsmStandard, isGsm: true },
		{ message: gsm1Part, isGsm: true },
		{ message: gsm4Parts, isGsm: true },
		{ message: gsm6Parts, isGsm: true },
		{ message: gsmExtended, isGsm: true },
		{ message: gsmWithNewLine, isGsm: true },

		{ message: ucs2, isGsm: false },
		{ message: ucs21Part, isGsm: false },
		{ message: ucs24Parts, isGsm: false },
		{ message: ucs26Parts, isGsm: false },
		{ message: ucs2WithEmoji, isGsm: false },
		{ message: mixGsmUcs2, isGsm: false },
		{ message: mixGsmUcs2Emoji, isGsm: false },
	])(`should return $isGsm for $message`, ({ message, isGsm }) => {
		expect(isGsmMessage(message)).toBe(isGsm);
	});
});

describe('getMessageData', () => {
	test.each([
		{ message: gsmStandard, length: 11, maxLength: maxGsmMessageLength, parts: 1, isGsm: true },
		{ message: gsm1Part, length: 160, maxLength: maxGsmMessageLength, parts: 1, isGsm: true },
		{ message: gsm4Parts, length: 612, maxLength: maxGsmMessageLength, parts: 4, isGsm: true },
		{ message: gsm6Parts, length: 918, maxLength: maxGsmMessageLength, parts: 6, isGsm: true },
		{ message: gsmExtended, length: 20, maxLength: maxGsmMessageLength, parts: 1, isGsm: true },
		{ message: gsmWithNewLine, length: 11, maxLength: maxGsmMessageLength, parts: 1, isGsm: true },

		{ message: ucs2, length: 4, maxLength: maxUcs2MessageLength, parts: 1, isGsm: false },
		{ message: ucs21Part, length: 70, maxLength: maxUcs2MessageLength, parts: 1, isGsm: false },
		{ message: ucs24Parts, length: 268, maxLength: maxUcs2MessageLength, parts: 4, isGsm: false },
		{ message: ucs26Parts, length: 402, maxLength: maxUcs2MessageLength, parts: 6, isGsm: false },
		{ message: ucs2WithEmoji, length: 7, maxLength: maxUcs2MessageLength, parts: 1, isGsm: false },
		{ message: mixGsmUcs2, length: 16, maxLength: maxUcs2MessageLength, parts: 1, isGsm: false },
		{ message: mixGsmUcs2Emoji, length: 19, maxLength: maxUcs2MessageLength, parts: 1, isGsm: false },
	])(
		`should return { length: $length, parts: $parts, isGsm: $isGsm } for $message`,
		({ message, length, maxLength, parts, isGsm }) => {
			const result: MessageData = getMessageData(message);
			const expected: MessageData = {
				length,
				maxLength,
				parts,
				maxParts: MAX_PARTS,
				isGsm,
			};

			expect(result).toEqual(expected);
		}
	);
});
