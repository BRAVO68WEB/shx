import Button from '@/components/ui/Button';
import { Download } from 'lucide-react';
import React from 'react';

function Page() {
	return (
		<>
			<div className="w-full my-3 p-4 flex items-center justify-between bg-gray-900 rounded">
				<p>Lorem Ipsum Config</p>
				<Button size={'icon'} variant={'transparent'}>
					<Download />
				</Button>
			</div>

			<div className="w-full my-3 p-4 flex items-center justify-between bg-gray-900 rounded">
				<p>Lorem Ipsum Config</p>
				<Button size={'icon'} variant={'transparent'}>
					<Download />
				</Button>
			</div>

			<div className="w-full my-3 p-4 flex items-center justify-between bg-gray-900 rounded">
				<p>Lorem Ipsum Config</p>
				<Button size={'icon'} variant={'transparent'}>
					<Download />
				</Button>
			</div>

			<div className="w-full my-3 p-4 flex items-center justify-between bg-gray-900 rounded">
				<p>Lorem Ipsum Config</p>
				<Button size={'icon'} variant={'transparent'}>
					<Download />
				</Button>
			</div>
		</>
	);
}

export default Page;
