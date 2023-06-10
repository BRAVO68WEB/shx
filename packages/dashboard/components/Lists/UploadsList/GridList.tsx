import Button from '@/components/ui/Button';
import { ArrowUpRight, Trash } from 'lucide-react';
import React from 'react'

const files: UploadsListFile[] = [
	{
		name: 'Lindsay Walton',
		date: '2023-05-29T08:08:07.289624+00:00',
		src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
	},
];

export default function GridList() {
  return (
		<div className="w-full grid grid-cols-3 gap-2 p-4">
			{files.map((file,index) => (
				<div key={index} className="grid-item overflow-hidden rounded-md w-full aspect-square flex items-center justify-center bg-gray-900 relative group">
					<img
						src={file.src}
						alt=""
						className="w-full h-full object-contain object-center"
					/>
					<div className="controls flex items-center justify-end gap-5 w-full absolute bottom-0 left-0 right opacity-0 translate-y-full p-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
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
					</div>
				</div>
			))}
		</div>
	);
}
