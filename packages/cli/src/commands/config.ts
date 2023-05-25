import { Command } from 'commander';
import configFn from '../functions/config';

export default (program: Command) => {
	return program
		.command('config')
		.description('Configure the SHX CLI')
		.action(() => {
			configFn();
		});
};
