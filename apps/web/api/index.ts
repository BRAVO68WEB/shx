import axios, { Axios } from 'axios';
import Uploads from './uploads';
import Notes from './notes';
import ApiKeys from './apiKeys';
import Url from './url';
import Settings from './settings';
import Cookies from 'js-cookie';

class ApiSdk {
	private _axios: Axios;
	uploads: Uploads;
	notes: Notes;
	apiKeys: ApiKeys;
	url: Url;
	settings: Settings;
	constructor() {
		this._axios = this.createAxios();
		this.uploads = new Uploads(this._axios);
		this.notes = new Notes(this._axios);
		this.apiKeys = new ApiKeys(this._axios);
		this.url = new Url(this._axios);
		this.settings = new Settings(this._axios);
	}
	private createAxios(): Axios {
		const ax = axios.create();
		ax.interceptors.request.use(async config => {
			if (typeof window === 'undefined') {
				const { cookies } = await import('next/headers');
				config.headers['x-shx-api-key'] = cookies().get('apiKey')?.value;
			} else {
				config.headers['x-shx-api-key'] = Cookies.get().apiKey ?? '';
			}
			config.baseURL = process.env.NEXT_PUBLIC_INSTANCE_URL;

			return config;
		});
		return ax;
	}
	getAxios() {
		return this._axios;
	}
}

export default new ApiSdk();
