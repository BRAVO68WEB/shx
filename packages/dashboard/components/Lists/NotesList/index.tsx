import Button from '@/components/ui/Button';
import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

interface NotesLitsProps {
	data: INote[];
}

function NotesList({ data }: NotesLitsProps) {
	return (
		<div className="flex flex-col w-full gap-1">
			{data.map(note => {
				return (
					<div key={note.gistID} className="bg-gray-900 p-5 flex w-full gap-2">
						<div className="text flex-1">
							<p className="w-full max-w-lg">
								{note.content}
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
				);
			})}
		</div>
	);
}

export default NotesList;
