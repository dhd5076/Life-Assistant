import chalk from 'chalk';

export default class Logger {

    private timestamp(): string {
        return new Date().toISOString();
    }

    constructor() {

    }


    log(message: string): void {
        console.log(chalk.blue(this.timestamp() + ' ' + message));
    }

    warn(messsage: string): void {
        console.log(chalk.yellow(this.timestamp() + ' ' + messsage));
    }

    error(message: string): void {
        console.log(chalk.red(this.timestamp() + ' ' + message));
    }
}