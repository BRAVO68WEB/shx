import { Axios } from 'axios';

export class ApiKeys {
	axios: Axios;
	constructor(axios: Axios) {
		this.axios = axios;
	}
}

export default ApiKeys;
