'use client';

import React, { useState } from 'react';
import { List as ListIcon, GridIcon, LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import LinearList from './LinearList';
import GridList from './GridList';
import UploadsControls from './UploadsControls';
import { UploadsListComponentProps } from '@/types/list';

type ListOption = 0 | 1;

type ListOptions = {
	name: string;
	Icon: LucideIcon;
	List: React.FC<UploadsListComponentProps>;
}[];

const listOptions: ListOptions = [
	{ name: 'list', Icon: ListIcon, List: LinearList },
	{ name: 'grid', Icon: GridIcon, List: GridList },
];

interface UploadsListProps {
	data: IFile[];
}

const UploadsList: React.FC<UploadsListProps> = ({data}) => {
	const [listOption, setListOption] = useState<ListOption>(0);
	const [edit, setEdit] = useState<boolean>(false);

	const toggleEdit = () => setEdit(!edit);

	const ListComponent= listOptions[listOption].List;

	function changeListOption(option: ListOption) {
		return () => setListOption(option);
	}
	console.log(data)
	return (
		<div className="p-5">
			<div className="toolbar flex py-2 bg-primary items-center justify-center gap-5 mb-10 rounded-md">
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
			<UploadsControls onEditClick={toggleEdit} />
			<ListComponent edit={edit} data={data} />
		</div>
	);
};

export default UploadsList;
