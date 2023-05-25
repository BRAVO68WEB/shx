import axiosClient from '../libs/axios';

export default async (
	ourl: string,
	shrinkOptions: {
		clipboard: boolean;
	}
) => {
	console.log('Shorten URL ...\n');

	console.log('URL :- ', ourl);
	console.log('Shrink Options :- ', shrinkOptions);
};
