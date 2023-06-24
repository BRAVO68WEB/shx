'use client';

import Button from '@/components/ui/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const configs = [
	{
		name: 'Image Config',
		filename: 'image.sxcu',
		url: `${process.env.NEXT_PUBLIC_INSTANCE_URL}/config/image.sxcu?apikey=`,
		id: '1',
	},
	{
		name: 'Gist Config',
		filename: 'gist.sxcu',
		url: `${process.env.NEXT_PUBLIC_INSTANCE_URL}/config/gist.sxcu?apikey=`,
		id: '2',
	},
	{
		name: 'URL Config',
		filename: 'url.sxcu',
		url: `${process.env.NEXT_PUBLIC_INSTANCE_URL}/config/url.sxcu?apikey=`,
		id: '3',
	},
	{
		name: 'File Config',
		filename: 'file.sxcu',
		url: `${process.env.NEXT_PUBLIC_INSTANCE_URL}/config/file.sxcu?apikey=`,
		id: '4',
	},
];
const downloadFile = ({
	data,
	fileName,
	fileType,
}: {
	data: string;
	fileName: string;
	fileType: string;
}) => {
	// Create a blob with the data we want to download as a file
	const blob = new Blob([data], { type: fileType });
	// Create an anchor element and dispatch a click event on it
	// to trigger a download
	const a = document.createElement('a');
	a.download = fileName;
	a.href = window.URL.createObjectURL(blob);
	const clickEvt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	});
	a.dispatchEvent(clickEvt);
	a.remove();
};
function Page() {
	const [apiKey, setApiKey] = useState('');
	useEffect(() => {
		setApiKey(Cookies.get('apiKey') ?? '');
	},[]);

	async function onDownloadFile(url: string, filename: string) {
		try {
			const { data } = await axios.get(url);
			console.log(data);
			downloadFile({
				data: JSON.stringify(data),
				fileName: filename,
				fileType: 'text/json',
			});
		} catch {
			toast.error('Error downloading file');
		}
	}
	return (
		<>
			{configs.map(({ name, id, url, filename }) => {
				return (
					<div
						key={id}
						className="w-full my-3 p-4 flex items-center justify-between bg-gray-900 rounded"
					>
						<p>{name}</p>
						<Button
							size={'icon'}
							onClick={() => onDownloadFile(`${url}${apiKey}`, filename)}
						>
							<Download />
						</Button>
					</div>
				);
			})}
		</>
	);
}

export default Page;
