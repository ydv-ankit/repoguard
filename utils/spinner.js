const chalk = require('chalk');

class Loader {
	// initialize the loader
	constructor(text, style = 'circle') {
		this.text = text;
		this.styles = {
			dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
			circle: ['◜', '◠', '◝', '◞', '◡', '◟']
		};
		this.style = this.styles[style] || this.styles['circle'];
		this.interval = null;
		this.currentFrameIndex = 0;
	}

	// set the message to be displayed
	message(text) {
		this.text = text;
	}

	start() {
		// hide cursor
		process.stdout.write('\x1B[?25l');
		// start the loader
		this.interval = setInterval(() => {
			this.render();
			this.currentFrameIndex =
				(this.currentFrameIndex + 1) % this.style.length;
		}, 50);
	}

	// stop the loader
	stop() {
		clearInterval(this.interval);
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
	}

	// render the loader
	render() {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(
			`${chalk.hex('#00f')(this.style[this.currentFrameIndex])} ${this.text}`
		);
	}
}

module.exports = Loader;
