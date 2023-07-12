import api from '@/api';
import Notes from '@/components/Notes';
import React from 'react';

async function Page() {
	const data = await api.notes.getAllNotes();
	return (
		<>
			<h1 className="text-4xl">Notes</h1>
			<Notes data={data} />
		</>
	);
}

export default Page;
