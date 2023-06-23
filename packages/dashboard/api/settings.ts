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
	async updateASetting(key: string, value:string|string[]){
		const res = await this.axios.post('/settings', {key, value});
		return res
	}
}

export default Settings;
