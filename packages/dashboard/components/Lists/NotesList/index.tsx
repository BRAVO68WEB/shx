import Button from '@/components/ui/Button';
import { Edit, Trash2 } from 'lucide-react';
import React from 'react'

function NotesList() {
  return (
		<div className="flex flex-col w-full gap-1">
			<div className="bg-gray-900 p-5 flex w-full gap-2">
				<div className="text flex-1">
					<p className="w-full max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
				<div className="buttons flex h-min gap-3">
					<Button
						variant="transparent"
						size={'icon'}
						aria-label="Delete Image"
						title="Delete Image"
						className="rounded-full hover:bg-red-50 hover:text-red-600 text-red-300"
					>
						<Trash2 className="h-5 w-5" />
					</Button>
					<Button
						variant="transparent"
						size={'icon'}
						aria-label="Edit Note"
						title="Edit Note"
						className="rounded-full hover:bg-black"
					>
						<Edit className="h-5 w-5 " />

					</Button>
				</div>
			</div>
		</div>
	);
}

export default NotesList