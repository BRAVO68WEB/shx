'use client';

import api from '@/api';
import Button from '@/components/ui/Button';
import { parseDate } from '@/lib/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ApiKeyListProps {
	data: IApiKey[];
}

function ApiKeyList({ data }: ApiKeyListProps) {
	const [apiKeys, setApiKeys] = useState(data);
	const router = useRouter();
	const onDisableApiKey = async (id: string, key: string) => {
		try {
			const apiKey = Cookies.get().apiKey as string;
			await api.apiKeys.disableApiKey(id);
			if (apiKey.endsWith(key.substring(9))) {
				Cookies.remove('apiKey');
				Cookies.remove('masterKey');
				router.replace('/');
			}
			setApiKeys(old => old.filter(key => key.keyID !== id));
		} catch (err) {
			console.error('Error Deleting api key');
			toast.error('Error deleting api key');
		}
	};
	return (
		<div>
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="p-2">
					<tr>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 w-full text-left text-sm font-semibold text-white"
						>
							Name
						</th>
						<th scope="col" className="relative py-3.5  px-4">
							<span className="sr-only">Controls</span>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y p-2">
					{apiKeys.map(({ key, keyID, last_used }) => (
						<tr className="bg-gray-900 rounded" key={keyID}>
							<td className="whitespace-nowrap  pl-4 text-sm font-medium text-white">
								<p className="text-xl">{key}</p>
								<p className="text-xs text-gray-400">
									Last Used: {parseDate(last_used)}
								</p>
							</td>
							<td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium icons flex center items-center gap-3">
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Disable Api Key"
									title="Disable Api Key"
									className="rounded-full p-2 bg-red-100 text-red-600"
									onClick={() => onDisableApiKey(keyID, key)}
								>
									Disable
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ApiKeyList;
