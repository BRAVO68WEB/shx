import api from '@/api';
import React from 'react';

async function Page() {
	const res = await api.settings.getInstanceInfo();
	const data = Object.entries(res);

	return (
		<div>
			<table className="min-w-full divide-y divide-gray-700 mt-4">
				<thead className="p-2">
					<tr>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-5 text-left text-lg font-semibold text-white"
						>
							Name
						</th>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white"
						>
							Value
						</th>
					</tr>
				</thead>
				<tbody className="divide-y p-2">
					{data.map((val, id) => (
						<tr className="bg-gray-900 rounded" key={id}>
							<td className="whitespace-nowrap py-5  pl-4 pr-20 text-sm font-medium text-white">
								<div className="flex items-center gap-3">{val[0]}</div>
							</td>
							<td className="whitespace-nowrap  pl-4 text-sm font-medium text-white">
								<div className="flex items-center gap-3">{val[1]}</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Page;
