import { Axios } from 'axios';
import Cookies from 'js-cookie';

export class ApiKeys {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	private async getMasterKey() {
		let key = '';
		if (typeof window === undefined) {
			const { cookies } = await import('next/headers');
			key = cookies().get('masterKey')?.value ?? '';
		} else {
			key = Cookies.get('masterKey') ?? '';
		}
		return key;
	}
	async getAllKeys() {
		return await this.axios.get(`/apiKey`, {
			params: { masterkey: this.getMasterKey() },
		});
	}
	async createKey() {
		const res = await this.axios.post(
			`/apiKey`,
			{},
			{ params: { masterkey: await this.getMasterKey() } }
		);
		return res.data.data.key as string;
	}
}

export default ApiKeys;
