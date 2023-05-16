import { ISXCUService } from '../interfaces/sxcu.interface';
import { SXCUFile } from '../types';

export default class SxcuService implements ISXCUService {
	public async createUploadImageSxcu(
		apiKey: string,
		url: string
	): Promise<SXCUFile> {
		const sxcu: SXCUFile = {
			Version: '15.0.0',
			Name: 'Images (shx)',
			DestinationType: 'ImageUploader',
			RequestMethod: 'POST',
			RequestURL: url + '/upload/image',
			Body: 'MultipartFormData',
			FileFormName: 'file',
			Headers: {
				'x-shx-api-key': apiKey,
			},
			URL: '{json:data.url}',
			ErrorMessage: '{json:data.message}',
		};

		return sxcu;
	}

	public async createUploadFileSxcu(
		apiKey: string,
		url: string
	): Promise<SXCUFile> {
		const sxcu: SXCUFile = {
			Version: '15.0.0',
			Name: 'Files (shx)',
			DestinationType: 'FileUploader',
			RequestMethod: 'POST',
			RequestURL: url + '/upload/file',
			Body: 'MultipartFormData',
			FileFormName: 'file',
			Headers: {
				'x-shx-api-key': apiKey,
			},
			URL: '{json:data.url}',
			ErrorMessage: '{json:data.message}',
		};

		return sxcu;
	}

	public async createURLShrinkSxcu(
		apiKey: string,
		url: string
	): Promise<SXCUFile> {
		const sxcu: SXCUFile = {
			Version: '12.4.0',
			Name: 'URL Shortener (shx)',
			DestinationType: 'URLShortener',
			RequestMethod: 'POST',
			RequestURL: url + '/url',
			Body: 'FormURLEncoded',
			Headers: {
				'x-shx-api-key': apiKey,
			},
			Arguments: {
				url: '{input}',
			},
			URL: '{json:data.url}',
			ErrorMessage: '{json:data.message}',
		};

		return sxcu;
	}

	public async createPasteSxcu(apiKey: string, url: string): Promise<SXCUFile> {
		const sxcu: SXCUFile = {
			Version: '12.4.0',
			Name: 'Paste (shx)',
			DestinationType: 'TextUploader',
			RequestMethod: 'POST',
			RequestURL: url + '/gist',
			Headers: {
				'x-shx-api-key': apiKey,
			},
			Body: 'FormURLEncoded',
			Arguments: {
				content: '{input}',
				isOneTimeOnly: '{prompt:Burn after Read|false}',
				passkey: '{prompt:Enter passkey}',
			},
			URL: '{json:data.gist_url}',
			ErrorMessage: '{json:data.message}',
		};

		return sxcu;
	}
}
