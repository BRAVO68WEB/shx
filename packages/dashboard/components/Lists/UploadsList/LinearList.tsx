import Button from '@/components/ui/Button';
import { ArrowUpCircle, ArrowUpRight, Cross, Edit, Plus, RotateCcw, Trash, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';

const files: UploadsListFile[] = [
	{
		name: 'Lindsay Walton',
		date: '2023-05-29T08:08:07.289624+00:00',
		src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
	},
];

export default function LinearList() {
	const [edit, setEdit] = useState<boolean>(false);
	const [uploadModalOpen, setUploadModalOpen] = useState(false)
	const [fileUpload,setFileUpload] = useState<File | null>(null)
	


	const fileInputChange:React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		if(evt.target.value) {
			setFileUpload(evt.target.files?evt.target.files[0]:null)
		}
	}

	const resetFileUpload = () => {
		setFileUpload(null)
	}

	// parse a date from gmt format to iso format
	const parseDate = (date: string) => {
		return new Date(date).toISOString().split('T')[0];
	};

	const toggleEdit = () => setEdit(!edit);

	return (
		<div className="flex flex-col w-full gap-2 p-5">
			<div className="flex gap-6 items-cetner w-full">
				<Input id="search" name="search" placeholder="Search" />

				<div className="flex items-center">22/33</div>

				<Button
					onClick={() => {
						setUploadModalOpen(true);
					}}
					className="my-2 flex justify-between items-center w-auto gap-2"
				>
					<span>Add</span> <Plus />
				</Button>
				<Button
					onClick={toggleEdit}
					className="my-2 flex justify-between items-center w-auto gap-2"
				>
					<span>Edit</span> <Edit />
				</Button>
			</div>
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
					{files.map((person, index) => (
						<tr className="bg-gray-900 rounded" key={index}>
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
								{person.name}
							</td>
							<td className="whitespace-nowrap px-9 py-4 text-sm text-gray-300">
								{parseDate(person.date)}
							</td>
							<td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium icons flex center items-center gap-3">
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Delete Image"
									title="Delete Image"
									className="rounded-full p-2  hover:bg-red-50 hover:text-red-600 text-red-300"
								>
									<Trash className="h-4 w-4 " />
								</Button>
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Open Image"
									title="Open Image"
									className="rounded-full p-2 hover:bg-black"
								>
									<ArrowUpRight className="h-4 w-4 " />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Modal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
				<div className="flex-col flex items-center  p-2 gap-3">
					<div className="controls w-full flex items-center justify-end">
						<Button onClick={() => setUploadModalOpen(false)} size={'icon'} aria-label="Reset" title="Reset">
							<X className="h-4 w-4 " />
						</Button>
					</div>

					<label
						htmlFor='fileUpload'
						className="input w-full h-20 border-primary border flex justify-center items-center"
					>
						{fileUpload?<img src={URL.createObjectURL(fileUpload)} alt="file" className='w-full h-full object-contain object-center' />:<p>Upload</p>}
					</label>
					<input onChange={fileInputChange} type="file" hidden multiple={false} id='fileUpload'  />
				</div>
			</Modal>
		</div>
	);
}
