import Button from '@/components/ui/Button';
import { ArrowUpRight, Trash } from 'lucide-react';
import React from 'react';
import { cn, parseDate } from '@/lib/utils';
import { UploadsListComponentProps } from '@/types/list';

export default function LinearList({
	edit,
	data,
	onDelete,
}: UploadsListComponentProps) {
	// parse a date from gmt format to iso format

	return (
		<div className="flex flex-col w-full gap-2 ">
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="p-2">
					<tr>
						<th scope="col" className="relative p-4 px-6">
							<span className="sr-only">Select</span>
						</th>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 w-full text-left text-sm font-semibold text-white"
						>
							Name
						</th>
						<th
							scope="col"
							className="px-9 py-3.5 text-left text-sm font-semibold text-white"
						>
							Date
						</th>
						<th scope="col" className="relative py-3.5  px-4">
							<span className="sr-only">Controls</span>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y p-2">
					{data.map(
						({ fileID, filename, uploaded_at, upload_url, deleteToken }) => (
							<tr className="bg-gray-900 rounded" key={fileID}>
								<td className="relative whitespace-nowrap p-4  text-right text-sm font-medium">
									<input
										type="checkbox"
										className={cn(
											'h-4 w-4 rounded bg-transparent border-primary text-primary',
											{ hidden: !edit }
										)}
									/>
								</td>
								<td className="whitespace-nowrap  pl-4 text-sm font-medium text-white">
									{filename}
								</td>
								<td className="whitespace-nowrap px-9 py-4 text-sm text-gray-300">
									{parseDate(uploaded_at)}
								</td>
								<td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium icons flex center items-center gap-3">
									<Button
										variant="transparent"
										size={'icon'}
										aria-label="Delete Image"
										title="Delete Image"
										className="rounded-full p-2  hover:bg-red-50 hover:text-red-600 text-red-300"
										onClick={() => onDelete(fileID, deleteToken)}
									>
										<Trash className="h-4 w-4 " />
									</Button>
									<a
										href={upload_url}
										target="_blank"
										download={false}
										referrerPolicy="no-referrer"
										className="rounded-full p-2 hover:bg-black"
									>
										<ArrowUpRight className="h-4 w-4 " />
									</a>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}
