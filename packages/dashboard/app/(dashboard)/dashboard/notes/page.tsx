import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Edit, PlusIcon, SearchIcon, Trash, Trash2 } from 'lucide-react'
import React from 'react'

function Notes() {
  return (
		<>
			<h1 className="text-4xl ">Notes</h1>

			<div className="bg-gray-900 p-5 flex items-center w-full gap-2 my-10">
				<Input type="text" placeholder="Search Notes" className="flex-1" />
				<Button size="icon">
					<SearchIcon className="h-4 w-4" />
				</Button>
				<Button title="Add a note" size="icon">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</div>
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
						aria-label="Open Image"
						title="Open Image"
						className="rounded-full hover:bg-black"
					>
						<Edit className="h-5 w-5 " />
					</Button>
				</div>
			</div>
		</>
	);
}

export default Notes