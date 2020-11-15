const Hangman = {
	wordList: [
		{ letters: 'pelota', hidden: 'elta' },
		{ letters: 'edificio', hidden: 'eifo' },
		{ letters: 'martillo', hidden: 'mario' },
		{ letters: 'bicicleta', hidden: 'biieta' },
		{ letters: 'automovil', hidden: 'utoovi' },
		{ letters: 'perilla', hidden: 'perlla' },
		{ letters: 'hornilla', hidden: 'hrlla' },
		{ letters: 'reloj', hidden: 'eoj' },
		{ letters: 'lampara', hidden: 'apara' },
		{ letters: 'chaqueta', hidden: 'aquta' },
		{ letters: 'llavero', hidden: 'aver' },
	],
	init: function() {
		console.info('Game started!');
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
		this.loader = document.querySelector('.hangman-loader');
		this.initLoad();
		this.index = this.getIndex();
		this.word = this.wordList[this.index];
		this.loser = 0;
		this.winner = 0;
		this.key = null;
		this.maximumAttempts = 5;
		this.wordText = document.getElementById('word');
		this.writeWord();
		this.writeKeyword();
		this.attachKeyEvent();
		this.attachChangeWordEvent();
		setTimeout(() => this.endLoad(), 999);
	},
	initLoad: function() {
		this.loader.classList.add('is-active');
	},
	endLoad: function() {
		this.loader.classList.remove('is-active');
	},
	attachKeyEvent: function() {
		document.querySelectorAll('.key').forEach((item) => {
			item.addEventListener('click', (event) => {
				this.pressKey(event.target);
			});
		});
	},
	attachChangeWordEvent: function() {
		document
			.querySelector('.change-word')
			.addEventListener('click', function() {
				Hangman.restart();
			});
	},
	restart: function() {
		setTimeout(() => this.init(), 1500);
	},
	getIndex: function() {
		const max = this.wordList.length;
		const min = 0;
		return Math.floor(Math.random() * (max - min)) + min;
	},
	writeWord: function() {
		this.wordText.innerHTML = '';
		for (let letters in this.word.letters) {
			let letter = this.word.letters[letters].toUpperCase();
			let visibility = this.word.hidden.toUpperCase().includes(letter)
				? 'invisible'
				: 'visible';

			this.wordText.innerHTML += `<span class="letter mx-2"><span class="${visibility}">${letter}</span></span>`;
		}
	},
	writeKeyword: function() {
		let keyboardContainer = document.querySelector('.keyboard');
		let buttons = '';
		keyboardContainer.innerHTML = '';
		for (let i = 65; i <= 90; i++) {
			let br = i == 73 || i == 82 ? `<br>` : ``;
			let letter = String.fromCharCode(i);
			let status =
				this.word.letters.toUpperCase().includes(letter) &&
				!this.word.hidden.toUpperCase().includes(letter)
					? 'disabled'
					: '';

			buttons += `<button class="button is-primary is-rounded key" value="${letter}" ${status} >${letter}</button>${br}`;
		}
		keyboardContainer.innerHTML = buttons;
	},
	pressKey: function(key) {
		key.setAttribute('disabled', 'disabled');
		const spans = document.querySelectorAll('.letter span');
		let letterIndexes = this.findLetter(key.value);
		letterIndexes.forEach((index) => {
			spans[index].classList.remove('invisible');
			spans[index].classList.add('visible');
		});
		this.key = key;
		this.checkWord();
	},
	findLetter: function(letter) {
		return this.word.letters
			.toUpperCase()
			.split('')
			.map((l, k) => {
				return l === letter.toUpperCase() ? k : -1;
			})
			.filter((e) => e !== -1);
	},
	checkWord: function() {
		const letters = document.querySelectorAll('.letter span.visible');
		const word = this.word.letters;
		const parts = [
			undefined,
			'#head',
			'#body',
			'#right-arm',
			'#right-leg',
			'#left-arm',
			'#left-leg',
		];
		if (letters.length >= word.length) {
			console.info('You are the winner');
			this.restart();
		}

		if (
			this.key &&
			!this.word.letters.toUpperCase().includes(this.key.value)
		) {
			this.loser++;
			document
				.querySelector(parts[this.loser])
				.classList.remove('invisible');
			if (this.loser > this.maximumAttempts) {
				alert('Your lost!');
				this.restart();
			}
		}
	},
};
Hangman.init();
