import { Axios } from 'axios';

export class Url {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
}

export default Url;
