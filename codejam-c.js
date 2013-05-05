
// NodeJS file system module
var fs = require('fs');

// Read in the dictionary
var dict = fs.readFileSync('../../Downloads/garbled_email_dictionary.txt', 'utf8'),

// Split the file into an array based on new line
dict = dict.split('\n');
dict.pop();

var dictMaxLength = 10, // Analysed from file
	resultNum = 0; // Variable for incrementing output

// Third argument should be the input file, zero based array
var inputFileName = process.argv[2],
	input = fs.readFileSync(inputFileName, 'utf8');

input = input.split('\n');
var testcount = parseInt(input.shift(), 10);

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
	'v', 'w', 'x', 'y', 'z'];

/**
 * Outputs a console line in the proper format
 * @param  {Integer} changeCount
 */
function outputResult(changeCount) {
	console.log('Case #' + (++resultNum) + ': ' + changeCount);
}

var inputCase,
	wordSearch,
	isWord,
	i, j,
	changes,
	rotateStart = false,
	pos, lastChr, origChar;
for (i = 0; i < testcount; i++) {
	inputCase = input[i];
	changes = 0;
	while (inputCase) {
		for (j = (dictMaxLength > inputCase.length ? inputCase.length : dictMaxLength); j > 0; j--) {
			wordSearch = inputCase.substring(0, j);
			isWord = dict.indexOf(wordSearch) > -1;
			if (isWord) {
				break;
			}
		}
		if (isWord) {
			//matched a word, so reduce the string
			inputCase = inputCase.substring(wordSearch.length);
			rotateStart = false;
		}
		else {
			// did not match a word
			if (!rotateStart) {
				console.log('start rotating');
				// start rotating
				rotateStart = true;
				pos = 0;
				lastChr = 0;
				origChar = letters.indexOf(inputCase[pos]);
			}
			else {
				if (lastChr > letters.length) {
					// gone through all letters
					// restore original
					inputCase[pos] = letters[origChar];
					// increment pos
					pos++;
					// reset lastChr
					lastChr = 0;
				}
				else {
					lastChr++;
				}
				if (pos > (dictMaxLength > inputCase.length ? inputCase.length : dictMaxLength)) {
					changes++;
					break;
				}
			}
			inputCase = inputCase.substring(0, pos) + letters[lastChr] + inputCase.substring(pos + 1);
			console.log(inputCase, letters[lastChr]);
		}
	}
	outputResult(changes);
}
