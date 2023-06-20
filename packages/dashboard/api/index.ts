import axios, { Axios } from 'axios';
import Uploads from './uploads';

class ApiSdk {
	private _axios: Axios;
	private _apiKey: string;
	private _instanceUrl: string;
	uploads: Uploads;
	constructor() {
		this._instanceUrl = process.env.NEXT_APP_API_URL as string;
		this._apiKey = '';
		this._axios = this._setAxios();
		this.uploads = new Uploads(this._axios);
	}
	private _setAxios(): Axios {
		this._axios = axios.create({
			baseURL: this._instanceUrl,
			headers: {
				'x-shx-api-key': 'SHX-uyblf-ixuiz',
			},
		});
        this.uploads = new Uploads(this._axios);
		return this._axios;
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
