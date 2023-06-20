import Button from '@/components/ui/Button';
import { Download } from 'lucide-react';
import React from 'react';

const configs = [
	{
		name: 'Lorem Ipsum Config',
		id: '1',
	},
	{
		name: 'Lorem Cnofig',
		id: '12',
	},
	{
		name: 'Lorem Config Config',
		id: '13',
	},
	{
		name: 'Lorem ',
		id: '14',
	},
];

function Page() {
	return (
		<>
			{configs.map(({ name, id }) => {
				return (
					<div
						key={id}
						className="w-full my-3 p-4 flex items-center justify-between bg-gray-900 rounded"
					>
						<p>{name}</p>
						<Button size={'icon'} variant={'transparent'}>
							<Download />
						</Button>
					</div>
				);
			})}
		</>
	);
}

export default Page;
