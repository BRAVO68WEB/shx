import axios from 'axios';
import clip from 'clipboardy';
import { configFile } from '../shx';

export default async (
	ourl: string,
	shrinkOptions: {
		clipboard: boolean;
	}
) => {
	const axReq = {
		url: configFile.get('serverurl') + '/url/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-shx-api-key': configFile.get('token'),
		},
		data: {
			url: ourl,
		},
	};
	const result = await axios(axReq);
	let resURL = '';
	if (result.data.message == 'Success') {
		resURL = configFile.get('serverurl') + '/' + result.data.data.short_key;
		console.log('Shorten URL :- ', resURL);
	} else {
		console.log('Error :- ', result.data.error);
		return;
	}

	if (shrinkOptions.clipboard) clip.writeSync(resURL);
};
