'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { PlusIcon } from 'lucide-react';
import NotesList from './Lists/NotesList';
import TextArea from './ui/TextArea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNoteType, addNoteSchema } from '@/lib/validators/notes';
import api from '@/api';
import { toast } from 'react-hot-toast';
import { useDebounce } from '@/hooks/useDebounce';
import Modal from './Modal';

interface NotesProps {
	data: INote[];
}

function Notes({ data }: NotesProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [notes, setNotes] = useState<INote[]>(data);
	const { register, handleSubmit } = useForm<AddNoteType>({
		resolver: zodResolver(addNoteSchema),
	});
	const search = useDebounce(async (input: string) => {
		try {
			const res = await api.notes.getAllNotes(input);
			setNotes(res);
		} catch (err) {
			console.error(err);
			toast.error('A error occurred while searching');
		}
	}, 500);
	const addNoteSubmit = async (data: AddNoteType) => {
		try {
			const res = await api.notes.uploadSingleNote(data);
			setNotes(old => [res, ...old]);
		} catch (err) {
			console.error(err);
			toast.error('Error Uploading Data');
		} finally {
			setDialogOpen(false);
		}
	};
	const onDeleteNote = async (noteID: string) => {
		try {
			api.notes.deleteSingleNote({ noteID });
			setNotes(old => old.filter(note => note.gistID !== noteID));
		} catch (err) {
			console.error(err);
			toast.error('Error Deleting Note');
		}
	};
	const openAddNoteDialog = () => {
		setDialogOpen(true);
	};

	return (
		<>
			<div className="bg-gray-900 p-5 flex items-center w-full gap-2 my-10">
				<Input
					onChange={evt => search(evt.target.value)}
					type={'text'}
					placeholder="Search Notes"
					className="flex-1"
				/>
				{/* <Button size="icon">
					<SearchIcon className="h-4 w-4" />
				</Button> */}
				<Button onClick={openAddNoteDialog} title="Add a note" size="icon">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</div>
			<NotesList data={notes} onDeleteNote={onDeleteNote} />
			<Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
				<form
					onClick={e => {
						e.stopPropagation();
					}}
					onSubmit={handleSubmit(addNoteSubmit)}
					className="w-full max-w-xl bg-gray-800 text-primary p-5 rounded flex flex-col gap-2"
				>
					<TextArea
						{...register('content')}
						placeholder="Write your text ..."
						withLabel={true}
						label="Text"
					/>

					<Input
						{...register('passkey')}
						placeholder="Password"
						withLabel={true}
						label="Password"
						type="password"
					/>

					<div className="relative flex items-start">
						<div className="flex h-6 items-center">
							<input
								{...register('isOneTimeOnly')}
								id="burn"
								type="checkbox"
								className="h-4 w-4 rounded border-primary bg-transparent text-primary"
							/>
						</div>
						<label htmlFor="burn" className="ml-3 text-sm leading-6">
							<p className="font-medium text-primary">Burn</p>
							<p id="offers-description" className="text-white">
								Burn the note after first use
							</p>
						</label>
					</div>

					<Button>Add Note</Button>
				</form>
			</Modal>
		</>
	);
}

export default Notes;
