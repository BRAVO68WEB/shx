import { Command } from 'commander';
import gistFn from '../functions/gist';

export default (program: Command) => {
	return program
		.command('gist')
		.description('Create a new gist')
		.option('-c, --clipboard', 'Copy url to clipboard', false)
		.action((gistOptions: { clipboard: boolean }) => {
			if (!gistOptions.clipboard) {
				gistOptions = {
					clipboard: true,
				};
			}

			gistFn(gistOptions);
		});
};
