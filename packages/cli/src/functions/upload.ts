import fs from 'fs';
import path from 'path';
import clip from 'clipboardy';
import axios from 'axios';
import { configFile } from '../shx';
import { lookup } from 'mime-types';
import chalk from 'chalk';

export default async (filePath: string, fileOptions: any) => {
	let fileType = 'file';
	if (fileOptions.image) fileType = 'image';

	console.log(chalk.yellow('Uploading a file ... \n'));

	const fileBlob = new Blob([fs.readFileSync(filePath)], {
		type: lookup(filePath),
		endings: 'native',
	});
	const formData = new FormData();
	formData.append('file', fileBlob, path.basename(filePath));

	const reqData = {
		method: 'post',
		url: configFile.get('serverurl') + '/upload/' + fileType,
		headers: {
			'Content-Type': 'multipart/form-data',
			'x-shx-api-key': configFile.get('token'),
		},
		data: formData,
	};

	const { data } = await axios(reqData);
	console.log(chalk.greenBright('Upload URL :- ', data.data.url));

	if (fileOptions.clipboard) {
		clip.writeSync(data.data.url);
		console.log('Copied to clipboard!');
	}
	return;
};
