import Button from '@/components/ui/Button';
import Cookies from 'js-cookie';
import { ArrowUpRight, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NotesLitsProps {
	data: INote[];
	onDeleteNote: (note: string) => void;
}

function NotesList({ data, onDeleteNote }: NotesLitsProps) {
	const [instanceUrl, setInstanceURL] = useState('');
	useEffect(() => {
		setInstanceURL(Cookies.get('instanceUrl') ?? '');
	}, []);
	return (
		<div className="flex flex-col w-full gap-1">
			{data.map(note => {
				return (
					<div key={note.gistID} className="bg-gray-900 p-5 flex w-full gap-2">
						<div className="text flex-1">
							<p className="w-full max-w-lg">{note.content}</p>
						</div>
						<div className="buttons flex h-min gap-3">
							<Button
								variant="transparent"
								size={'icon'}
								aria-label="Delete Note"
								title="Delete Note"
								className="rounded-full hover:bg-red-50 hover:text-red-600 text-red-300"
								onClick={() => onDeleteNote(note.gistID)}
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
							<Link
								href={`/notes/${note.gist_url_key}`}
								aria-label="Go to Note"
								title="Go to Note"
								className="rounded-full hover:bg-black p-3 h-min w-min"
							>
								<ArrowUpRight className="h-5 w-5 " />
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default NotesList;
