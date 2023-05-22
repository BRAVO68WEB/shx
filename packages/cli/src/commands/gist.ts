import { Command } from 'commander';
import gistFn from '../functions/gist';

export default (program: Command) => {
	return program
		.command('gist')
		.description('Create a new gist')
		.action(() => {
			gistFn();
		});
};
