const chalk = require('chalk');
const { loadOra } = require('./ora-spinner');

const LogError = text => {
	console.log(chalk.red(text));
};

const LogSuccess = text => {
	console.log(chalk.green(text));
};

const LogInfo = text => {
	console.log(chalk.blue(text));
};

module.exports = {
	LogError,
	LogSuccess,
	LogInfo
};
