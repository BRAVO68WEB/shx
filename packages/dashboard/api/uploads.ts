import { Axios } from 'axios';

export class Uploads {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	async getAllUploads() {
		const res = await this.axios.get('/upload');
		const data = res.data.data as IFile[];
		return data;
	}
	async uploadSingleFile({file}:{file:File}){
		const data = new FormData()
		data.append('file', file)
		const res = await this.axios.post('/upload/file', data);
		return res.data.data as IFile
	}
	async deleteSingleFile({fileID,deleteToken}:{fileID:string,deleteToken:string}){
		const res = await this.axios.get(`/upload/delete/${fileID}`,{params:{token:deleteToken}})
		return res
	}
}

export default Uploads;
