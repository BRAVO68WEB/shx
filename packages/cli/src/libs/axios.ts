import axios from 'axios';
import { configFile } from '../shx';

const instance = axios.create({
	baseURL: configFile.get('serverurl'),
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
		'x-shx-api-key': configFile.get('token'),
	},
});

export default instance;
