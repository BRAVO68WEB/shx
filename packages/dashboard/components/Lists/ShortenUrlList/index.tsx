'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Trash, Edit2, ArrowUpRight, X } from 'lucide-react';
import URLControls from './URLControls';
import Modal from '@/components/Modal';
import Input from '@/components/ui/Input';
import api from '@/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface ShortenUrlListProps {
	data: IUrl[];
}

interface EditUrlModal {
	state: boolean;
	id?: string;
	url?: string;
}

function ShortenUrlList({ data }: ShortenUrlListProps) {
	const router = useRouter();
	const [editURLModal, setEditURLModal] = useState<EditUrlModal>({
		state: false,
	});
	const [input, setInput] = useState('');
	const onAddURL = async (url: string) => {
		try {
			await api.url.uploadUrl(url);
			router.refresh();
		} catch (e) {
			console.error(e);
			toast.error('Error adding url');
		}
	};
	const onEditUrl = async (url: string, id: string) => {
		if (!input.trim()) return;
		try {
			await api.url.editUrl({ original_url: url, id: id, short_key: input });
			router.refresh();
		} catch (e) {
			console.error(e);
			toast.error('Error updating url');
		}finally{
			setEditURLModal({state:false})
		}
	};
	return (
		<>
			<URLControls onAddURL={onAddURL} />
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="p-2">
					<tr>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-5 text-left text-lg font-semibold  text-white"
						>
							Original URL
						</th>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 w-full text-left text-lg font-semibold text-white"
						>
							Shortened URL
						</th>
						<th scope="col" className="relative py-3.5  px-4 pr-0">
							<span className="sr-only">Controls</span>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y p-2">
					{data.map(({ original_url, urlID }) => (
						<tr className="bg-gray-900 rounded" key={urlID}>
							<td className="whitespace-nowrap  pl-4 pr-20 truncate text-sm font-medium text-white">
								<div className="flex items-center gap-3">
									<p className="w-80 truncate">{original_url}</p>
									<a
										referrerPolicy="no-referrer"
										href={original_url}
										target="_blank"
										className="p-2 bg-white bg-opacity-10 rounded cursor-pointer"
									>
										<ArrowUpRight className="h-4 w-4" />
									</a>
								</div>
							</td>
							<td className="whitespace-nowrap  pl-4 text-sm font-medium text-white">
								<div className="flex items-center gap-3">
									<p className="w-80 truncate">{original_url}</p>
									<a
										referrerPolicy="no-referrer"
										href={original_url}
										target="_blank"
										className="p-2 bg-white bg-opacity-10 rounded cursor-pointer"
									>
										<ArrowUpRight className="h-4 w-4" />
									</a>
								</div>
							</td>
							<td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium icons flex center items-center gap-3">
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Delete URL"
									title="Delete URL"
									className="rounded-full p-2 bg-red-100 text-red-600"
								>
									<Trash className="h-4 w-4 " />
								</Button>
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Edit URl Slug"
									title="Edit URL Slug"
									className="rounded-full p-2 hover:bg-black"
									onClick={() =>
										setEditURLModal({
											state: true,
											id: urlID,
											url: original_url,
										})
									}
								>
									<Edit2 className="h-4 w-4 " />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Modal
				open={editURLModal.state}
				onClose={() => setEditURLModal({ state: false })}
			>
				<div className="p-2">
					<div className="controls w-full flex items-center justify-end mb-4">
						<Button
							onClick={() => setEditURLModal({ state: false })}
							size={'icon'}
							aria-label="Reset"
							title="Reset"
						>
							<X className="h-4 w-4 " />
						</Button>
					</div>
					<Input
						type="text"
						id="new-slug"
						name="new_slug"
						withLabel={true}
						label="New Slug"
						value={input}
						onChange={evt => setInput(evt.target.value)}
					/>
					<Button
						onClick={() => onEditUrl(editURLModal.url!, editURLModal.id!)}
					>
						Modify URl
					</Button>
				</div>
			</Modal>
		</>
	);
}

export default ShortenUrlList;
