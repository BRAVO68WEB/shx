'use client';

import React, { useState } from 'react';
import { List as ListIcon, GridIcon, LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import LinearList from './LinearList';
import GridList from './GridList';

type ListOption = 0 | 1;

type ListOptions = {
	name: string;
	Icon: LucideIcon;
	List: React.FC;
}[];

const listOptions: ListOptions = [
	{ name: 'list', Icon: ListIcon, List: LinearList },
	{ name: 'grid', Icon: GridIcon, List: GridList },
];

const UploadsList = () => {
	const [listOption, setListOption] = useState<ListOption>(0);
	const ListComponent = listOptions[listOption].List
	function changeListOption(option: ListOption){
		return () => setListOption(option)
	}
	return (
		<>
			<div className="toolbar flex p-2 bg-primary items-center justify-center gap-5 m-5 rounded-md">
				{listOptions.map(({ name, Icon }, index) => {
					return (
						<Button
							key={index}
							size={'icon'}
							onClick={changeListOption(index as ListOption)}
							variant={'transparent'}
							className="bg-black"
							aria-label={name}
						>
							<Icon className="h-4 w-4" />
						</Button>
					);
				})}
			</div>
			<ListComponent />
		</>
	);
};

export default UploadsList;
