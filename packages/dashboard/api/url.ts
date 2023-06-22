import { Axios } from 'axios';

export class Url {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	async getAllUrls() {
		const res = await this.axios.get('/url');
		const data = res.data.data as IUrl[];
		return data;
	}
    async uploadUrl(url: string){
        const res = await this.axios.post('/url', {url});
        return res.data.data as IUrl;
    }
}

export default Url;
