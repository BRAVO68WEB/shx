import { Axios } from 'axios';

export class Settings {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	async getCurrentSettings() {
		const res = await this.axios.get('/settings');
		const data = res.data.data as ISettings;
		return data;
	}
}

export default Settings;
