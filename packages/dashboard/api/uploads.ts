import { Axios } from 'axios';

export class Uploads {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	async getAllUploads() {
		const res = await this.axios.get('/upload');
		const data = res.data as IFile[];
		return data;
	}
}

export default Uploads;
