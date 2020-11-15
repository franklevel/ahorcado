const path = require('path');

module.exports = {
	entry: './src/hangman.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
