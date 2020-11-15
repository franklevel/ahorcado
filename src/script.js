var wordText = document.getElementById('word');
var wordList = [
	{ letters: 'pelota', hidden: 'elta' },
	{ letters: 'edificio', hidden: 'eifo' },
	{ letters: 'martillo', hidden: 'mario' },
	{ letters: 'bicicleta', hidden: 'biieta' },
	{ letters: 'automovil', hidden: 'utoovi' },
	{ letters: 'perilla', hidden: 'perlla' },
	{ letters: 'hornilla', hidden: 'hrlla' },
];

let index = getIndex(wordList);
var winner = 0;
var loser = 0;

const head = document.querySelector('#head');
const rightArm = document.querySelector('#right-arm');
const body = document.querySelector('#body');
const rightLeg = document.querySelector('#right-leg');
const leftArm = document.querySelector('#left-arm');
const leftLeg = document.querySelector('#left-leg');
head.classList.add('invisible');
body.classList.add('invisible');
rightArm.classList.add('invisible');
rightLeg.classList.add('invisible');
leftArm.classList.add('invisible');
leftLeg.classList.add('invisible');

function getIndex(wordList) {
	const max = wordList.length;
	const min = 0;
	return Math.floor(Math.random() * (max - min)) + min;
}

function writeWord(word) {
	for (const letters in word.letters) {
		let letter = word.letters[letters].toUpperCase();
		let visibility = word.hidden.toUpperCase().includes(letter)
			? 'invisible'
			: 'visible';

		wordText.innerHTML += `<span class="letter"><span class="${visibility}">${letter}</span></span>`;
	}
}

function keyboard(word) {
	var keyboardContainer = document.querySelector('.keyboard');
	for (let i = 65; i <= 90; i++) {
		let br = i == 73 || i == 82 ? `<br>` : ``;
		let letter = String.fromCharCode(i);
		let status =
			word.letters.toUpperCase().includes(letter) &&
			!word.hidden.toUpperCase().includes(letter)
				? 'disabled'
				: '';

		keyboardContainer.innerHTML += `<button class="key" value="${letter}" ${status} onclick="pressKey(this)">${letter}</button>${br}`;
	}
}

function pressKey(key) {
	key.setAttribute('disabled', 'disabled');
	const parts = [
		undefined,
		'#head',
		'#body',
		'#right-arm',
		'#right-leg',
		'#left-arm',
		'#left-leg',
	];
	const spans = document.querySelectorAll('.letter span');
	let letterIndexes = findLetter(wordList[index].letters, key.value);
	letterIndexes.forEach((index) => {
		spans[index].classList.remove('invisible');
		spans[index].classList.add('visible');
	});

	if (!wordList[index].letters.toUpperCase().includes(key.value)) {
		loser++;
		document.querySelector(parts[loser]).classList.remove('invisible');
		if (loser > 5) {
			alert('Your lost!');
		}
	}
	checkWord();
}

function checkWord() {
	const letters = document.querySelectorAll('.letter span.visible');
	console.log(letters.length);
	const word = wordList[index].letters;
	if (letters.length === word.length) {
		alert('You are the winner');
		restart();
	}
}

function findLetter(letters, letter) {
	return letters
		.toUpperCase()
		.split('')
		.map((l, k) => {
			return l === letter.toUpperCase() ? k : -1;
		})
		.filter((e) => e !== -1);
}

function restart() {
	document.location.reload();
}

// Comentario
writeWord(wordList[index]);
keyboard(wordList[index]);
