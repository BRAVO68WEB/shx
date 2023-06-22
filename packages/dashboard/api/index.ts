import axios, { Axios } from 'axios';
import Uploads from './uploads';

class ApiSdk {
	private _axios: Axios;
	private _apiKey: string;
	private _instanceUrl: string;
	uploads: Uploads;
	constructor() {
		this._instanceUrl = process.env.NEXT_PUBLIC_API_URL as string;
		this._apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
		this._axios = axios.create({
			baseURL: this._instanceUrl,
			headers: {
				'x-shx-api-key': this._apiKey,
			},
		});
		this.uploads = new Uploads(this._axios);
	}
	private _setAxios() {
		this._axios.defaults.baseURL = this._instanceUrl;
		const headers: any = this._axios.defaults.headers;
		headers['x-shx-api-key'] = this._apiKey;
	}
	getAxios() {
		return this._axios;
	}
	setInstanceUrl(instanceUrl: string) {
		this._instanceUrl = instanceUrl;
		this._setAxios();
	}
	setApiKey(apiKey: string) {
		this._apiKey = apiKey;
		this._setAxios();
	}
}

export default new ApiSdk();