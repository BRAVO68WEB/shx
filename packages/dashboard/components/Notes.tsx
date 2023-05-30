import React from 'react'
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Edit, PlusIcon, SearchIcon, Trash, Trash2 } from 'lucide-react';
import NotesList from './Lists/NotesList';


function Notes() {
  return (
		<>
			<div className="bg-gray-900 p-5 flex items-center w-full gap-2 my-10">
				<Input type="text" placeholder="Search Notes" className="flex-1" />
				<Button size="icon">
					<SearchIcon className="h-4 w-4" />
				</Button>
				<Button title="Add a note" size="icon">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</div>
            <NotesList />
		</>
	);
}

export default Notes