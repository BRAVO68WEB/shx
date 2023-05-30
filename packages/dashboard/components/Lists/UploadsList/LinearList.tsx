import Button from '@/components/ui/Button'
import { ArrowUpRight, Delete, Trash } from 'lucide-react'
import React from 'react'

export default function LinearList() {
	// parse a date from gmt format to iso format
	const parseDate = (date:string) => {
        return new Date(date).toISOString().split('T')[0]
    }

    
  return (
		<div className="flex flex-col w-full gap-2 p-5">
			<div className="listItem w-full p-2 px-4 bg-gray-900 flex items-center">
				<p className="name">afdskfasdf.dsaf.png</p>
				<div className="date ml-auto mr-20">
					<p>{parseDate('2023-05-29T08:08:07.289624+00:00')}</p>
				</div>
				<div className="icons flex center items-center gap-3">
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
		</div>
	);
}
