import { Axios } from 'axios';
import Cookies from 'js-cookie';

export class ApiKeys {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	private async getMasterKey() {
		if (typeof window === 'undefined') {
			const { cookies } = await import('next/headers');
			return cookies().get('masterKey')?.value ?? '';
		} else {
			return Cookies.get('masterKey') ?? '';
		}
	}
	async getAllKeys() {
		const res = await this.axios.get(`/apiKey`, {
			params: { masterkey: await this.getMasterKey() },
		});
		return res.data.data as IApiKey[];
	}
	async createKey() {
		const res = await this.axios.post(
			`/apiKey`,
			{},
			{ params: { masterkey: await this.getMasterKey() } }
		);
		return res.data.data.key as string;
	}
	async disableApiKey(id: string) {
		const res = await this.axios.delete('/apiKey', {
			params: { masterkey: await this.getMasterKey(), apikeyID: id },
		});
		return res;
	}
}

export default ApiKeys;
