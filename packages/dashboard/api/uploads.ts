import { Axios } from 'axios';

export class Uploads {
	axios: Axios;
	constructor(axios:Axios) {
		this.axios = axios
	}
	async getAllUploads() {
		try {
			const res = await this.axios.get('/upload');
			const data = res.data as IFile[];
			return data;
		} catch (e) {
			throw e
		}
	}
}

export default Uploads;