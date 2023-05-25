import { configFile } from '../shx';
import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';

export default async () => {
	console.log('SHX CLI configuration wizard ...\n');
	const configQuestions = await inquirer.prompt([
		{
			type: 'input',
			name: 'serverurl',
			message:
				"What is the URL of your SHX server (don't have '/' at the ending)?",
			default: configFile.get('serverurl'),
		},
		{
			type: 'password',
			name: 'token',
			message: 'What is your SHX token?',
			default: configFile.get('token'),
		},
	]);

	const checkForAuth = await axios.get(
		configQuestions.serverurl + '/apikey/verify/' + configQuestions.token
	);

	if (checkForAuth.data.data.result) {
		console.log(chalk.green('\nAuthentication successful'));
	} else {
		console.log(chalk.red('\nAuthentication failed'));
		return;
	}
	configFile.set('serverurl', configQuestions.serverurl);
	configFile.set('token', configQuestions.token);
	return;
};
