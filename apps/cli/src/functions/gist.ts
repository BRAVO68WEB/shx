import inquirer from 'inquirer';
import { configFile } from '../shx';
import axios from 'axios';
import clip from 'clipboardy';

export default async (gistOptions: any) => {
	let configQuestions;
	if (gistOptions.override) {
		console.log('Switched to direct mode ...\n');
		configQuestions = {
			content: gistOptions.oc,
			isOneTimeOnly: gistOptions.burn,
			isPrivate: gistOptions.passkey ? true : false,
			passkey: gistOptions.passkey,
		};
	} else {
		configQuestions = await inquirer.prompt([
			{
				type: 'editor',
				name: 'content',
				message: 'Content of the gist',
			},
			{
				type: 'confirm',
				message: 'Burn after reading?',
				name: 'isOneTimeOnly',
				default: false,
			},
			{
				type: 'confirm',
				message: 'Private gist?',
				name: 'isPrivate',
				default: false,
			},
			{
				type: 'input',
				message: 'Passphrase',
				name: 'passkey',
				default: '',
				when: (answers: any) => answers.isPrivate,
			},
		]);
	}

	const reqData = {
		url: configFile.get('serverurl') + '/gist',
		headers: {
			'Content-Type': 'application/json',
			'x-shx-api-key': configFile.get('token'),
		},
		method: 'POST',
		data: configQuestions,
	};

	const { data } = await axios(reqData);
	const gistUrl =
		configFile.get('serverurl') + '/gist/' + data.data.gist_url_key;
	console.log('Gist URL :- ', gistUrl);
	if (gistOptions.clipboard) {
		clip.writeSync(gistUrl);
		console.log('Copied to clipboard!');
	}
	return;
};
