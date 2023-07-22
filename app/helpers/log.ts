import chalk from 'chalk';

const log = console.log

chalk.level = 1

log(chalk.blue('Hello') + ' World' + chalk.red('!'))