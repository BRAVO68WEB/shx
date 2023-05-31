"use client"
import React, { useEffect, useRef } from 'react'
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Edit, PlusIcon, SearchIcon, Trash, Trash2 } from 'lucide-react';
import NotesList from './Lists/NotesList';
import TextArea from './ui/TextArea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNoteType, addNoteSchema } from '@/lib/validators/notes';



function Notes() {
    const dialogRef = useRef<HTMLDialogElement>(null)
	const {register,handleSubmit,formState:{errors}} = useForm<AddNoteType>({
		resolver:zodResolver(addNoteSchema),
	})
	const addNoteSubmit = (data:AddNoteType) => {
		console.log('data')
		console.log(data)
	}
	console.log(errors,'errs')
    useEffect(() => {
        dialogRef.current?.show()
    },[])
  return (
		<>
			<div className="bg-gray-900 p-5 flex items-center w-full gap-2 my-10">
				<Input type={"text"} placeholder="Search Notes" className="flex-1" />
				<Button size="icon">
					<SearchIcon className="h-4 w-4" />
				</Button>
				<Button title="Add a note" size="icon">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</div>
			<NotesList />
			<dialog
				aria-modal
				className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-transparent"
				ref={dialogRef}
			>
				<form
					onSubmit={handleSubmit(addNoteSubmit)}
					className="w-full max-w-xl bg-gray-800 text-primary p-5 rounded flex flex-col gap-2"
				>
					<TextArea
						{...register('text')}
						placeholder="Write your text ..."
						withLabel={true}
						label="Text"
					/>

					<Input
						{...register('password')}
						placeholder="Password"
						withLabel={true}
						label="Password"
						type="password"
					/>

					<div className="relative flex items-start">
						<div className="flex h-6 items-center">
							<input
								{...register("burn")}
								id="burn"
								type="checkbox"
								className="h-4 w-4 rounded border-primary bg-transparent text-primary"
							/>
						</div>
						<div className="ml-3 text-sm leading-6">
							<label htmlFor="burn" className="font-medium text-primary">
								Burn
							</label>
							<p id="offers-description" className="text-white">
								Burn the note after first use
							</p>
						</div>
					</div>

					<Button>Add Note</Button>
				</form>
			</dialog>
		</>
	);
}

export default Notes