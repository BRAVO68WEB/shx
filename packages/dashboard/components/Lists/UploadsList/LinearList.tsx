import Button from '@/components/ui/Button'
import { Delete, Trash } from 'lucide-react'
import React from 'react'

export default function LinearList() {
  return (
		<div className="flex flex-col w-full gap-2 p-5">
			<div className="listItem w-full p-1 px-4 bg-gray-900 flex items-center justify-between">
				<p className="name">afdskfasdf.dsaf.png</p>
				<div className="icons">
					<Button variant="transparent" size={'icon'}>
						<Trash className="h-4 w-4 text-red-200" />
					</Button>
				</div>
			</div>
			<div className="listItem w-full p-2 px-4 bg-gray-900 flex items-center justify-between">
				<p className="name">afdskfasdf.dsaf.png</p>
				<div className="icons">
					<Button variant="transparent" size={'icon'} className='rounded-full p-2  hover:bg-red-50 hover:text-red-600 text-red-300'>
						<Trash className="h-4 w-4 " />
					</Button>
				</div>
			</div>
		</div>
	);
}
