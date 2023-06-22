import { AddNoteType } from '@/lib/validators/notes';
import { Axios } from 'axios';

export class Notes {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
	async getAllNotes(search?:string) {
		const res = await this.axios.get('/gist',{params:{search}});
		const data = res.data.data as INote[];
		return data;
	}
	async uploadSingleNote(data: AddNoteType) {
        console.log("uploading")
        if(!data.passkey){
            delete data.passkey
        }
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

export default Notes;
