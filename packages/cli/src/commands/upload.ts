import { Command } from 'commander';
import uploadFn from '../functions/upload';

export default (program: Command) => {
	return program
		.command('upload')
		.description('Show upload about the CLI')
		.arguments('<filePath>')
		.option('-c, --clipboard', 'Copy url to clipboard', false)
		.option('-f, --file', 'Upload file', true)
		.option('-i, --image', 'Upload image', false)
		.action(
			(
				filePath: string,
				fileOptions: {
					clipboard: boolean;
					file: boolean;
					image: boolean;
				}
			) => {
				if (!filePath) {
					console.log('Please provide a file path');
					return;
				}

				uploadFn(filePath, fileOptions);
			}
		);
};
