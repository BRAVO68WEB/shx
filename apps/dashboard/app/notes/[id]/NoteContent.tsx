'use client';

import api from '@/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Lock } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';
import { toast } from 'react-hot-toast';

interface NoteContentProps {
	data: INote | null;
	id: string;
}

function NoteContent({ data, id }: NoteContentProps) {
	const [note, setNote] = useState(data);
	const [input, setInput] = useState('');
	const onSubmit: FormEventHandler = async evt => {
		evt.preventDefault();
		try {
			const data = await api.notes.getSingleNote(id, input);
			setNote(data);
		} catch (err) {
			console.error(err);
			toast.error('Wrong passkey');
			setNote(null);
		}
	};
	return (
		<div className="w-1/2 p-10 border-primary border max-h-full overflow-y-auto">
			{note?.content ?? (
				<form
					onSubmit={onSubmit}
					className="flex items-center justify-between gap-4 w-full"
				>
					<Input
						withLabel={true}
						placeholder="Enter passkey"
						label="Enter passkey"
						className="w-full"
						onChange={evt => setInput(evt.target.value)}
						value={input}
					/>
					<Button size={'icon'}>
						<Lock />
					</Button>
				</form>
			)}
		</div>
	);
}

export default NoteContent;
