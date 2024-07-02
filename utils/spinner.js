const chalk = require("chalk");

class Loader {
    constructor(text, style = 'tick') {
        this.text = text;
        this.styles = {
            dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        };
        this.style = this.styles[style] || this.styles['dots']; // Default to 'tick'
        this.interval = null;
        this.currentFrameIndex = 0;
    }

    text(text) {
        this.text = text;
    }

    start() {
        this.interval = setInterval(() => {
            this.render();
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.style.length;
        }, 500); 
    }

    stop() {
        clearInterval(this.interval);
        process.stdout.write('\n');
    }

    render() {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write((`${chalk.hex('#fd3')(this.style[this.currentFrameIndex])} ${this.text}`));
    }
}

module.exports = Loader;