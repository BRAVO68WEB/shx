import api from '@/api';
import React from 'react';
import NoteContent from './NoteContent';

interface NotePageProps {
	params: {
		id: string;
	};
}

async function Page({ params: { id } }: NotePageProps) {
	let data: INote | null = null;
	try {
		data = await api.notes.getSingleNote(id);
	} catch {
		data = null;
	}
	return (
		<div className="w-full h-screen p-20 flex justify-center items-center">
			<NoteContent data={data} id={id} />
		</div>
	);
}

export default Page;
