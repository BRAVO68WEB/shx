import { Command } from 'commander';
import configFn from '../functions/config';

export default (program: Command) => {
	return program
		.command('config')
		.description('Configure the SHX CLI')
		.option('-s, --serverurl <serverurl>', 'Set the server url')
		.option('-t, --token <token>', 'Set the token')
		.option('-o, --override', 'Override question', false)
		.action(
			(configOptions: {
				serverurl: string;
				token: string;
				override: boolean;
			}) => {
				configFn(configOptions);
			}
		);
};
