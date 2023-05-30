import { Command } from 'commander';
import gistFn from '../functions/gist';

export default (program: Command) => {
	return program
		.command('gist')
		.description('Create a new gist')
		.option('-c, --clipboard', 'Copy url to clipboard', false)
		.option('-o, --override', 'Override question', false)
		.option('-p, --passkey <passkey>', 'Passkey for private gist', '')
		.option('-b, --burn', 'Burn after reading', false)
		.action(
			(gistOptions: {
				clipboard: boolean;
				overide: boolean;
				oc: any;
				passkey: string;
			}) => {
				const stdin = process.stdin;
				let inputText = '';

				if (!process.stdin.isTTY) {
					stdin.setEncoding('utf-8');

					stdin.on('readable', () => {
						const chunk = stdin.read();
						if (chunk !== null) {
							inputText += chunk;
						}
					});

					stdin.on('end', () => {
						gistOptions.oc = inputText.trim() || gistOptions.oc;
						gistFn(gistOptions);
					});
				} else {
					gistFn(gistOptions);
				}
			}
		);
};
