import { Command } from 'commander';
import infoFn from '../functions/info';

export default (program: Command) => {
	return program
		.command('info')
		.description('Show info about the CLI')
		.action(() => {
			infoFn();
		});
};
