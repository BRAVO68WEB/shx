import Button from '@/components/ui/Button';
import { Trash } from 'lucide-react';
import React from 'react';

const apiKeys = [
	{
		key: 'asdfasd****fsadf',
		enabled: true,
        lastUsed:"asdfasdfasdf"
	},
];

function ApiKeyList() {
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
					{apiKeys.map(({ key, enabled,lastUsed }, index) => (
						<tr className="bg-gray-900 rounded" key={index}>
							<td className="whitespace-nowrap  pl-4 text-sm font-medium text-white">
								<p className='text-xl'>{key}</p>
                                <p className='text-xs text-gray-400'>Last Used: {lastUsed}</p>
							</td>
							<td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium icons flex center items-center gap-3">
								{enabled ? (
									<Button
										variant="transparent"
										size={'icon'}
										aria-label="Disable Api Key"
										title="Disable Api Key"
										className="rounded-full p-2 bg-red-100 text-red-600"
									>
										Disable
									</Button>
								) : (
									<Button
										variant="transparent"
										size={'icon'}
										aria-label="Enable Api Key"
										title="Enable Api Key"
										className="rounded-full p-2 text-green-600 bg-green-100"
									>
										Enable
									</Button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ApiKeyList;
