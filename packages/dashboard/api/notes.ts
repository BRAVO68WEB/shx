import { AddNoteType } from '@/lib/validators/notes';
import { Axios } from 'axios';

export class Uploads {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	async getAllNotes() {
		const res = await this.axios.get('/gist');
		const data = res.data.data as INote[];
		return data;
	}
	async uploadSingleNote(data: AddNoteType) {
		const res = await this.axios.post('/gist', data);
		return res.data.data as INote;
	}
	async deleteSingleNote({
		noteID,
	}: {
		noteID: string;
	}) {
		const res = await this.axios.delete(`/gist/${noteID}`);
		return res;
	}
}

export default Uploads;
