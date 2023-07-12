import { Command } from 'commander';
import shrinkFn from '../functions/shrink';

export default (program: Command) => {
	return program
		.command('shrink')
		.description('Create a new shrink')
		.argument('<ourl>', 'Shrink from url')
		.option('-c, --clipboard', 'Copy url to clipboard', false)
		.action(
			(
				ourl: string,
				shrinkOptions: {
					clipboard: boolean;
				}
			) => {
				if (!ourl) {
					console.log('Please provide a url');
					return;
				}

				shrinkFn(ourl, shrinkOptions);
			}
		);
};
