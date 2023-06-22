'use client';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';

interface URLContrlProps {
	onAddURL: (url: string) => void;
}

function URLControls({ onAddURL }: URLContrlProps) {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [input, setInput] = useState('');

	const onClick = async () => {
		if (input.trim() === '') return;
		await onAddURL(input);
		setAddModalOpen(false);
	};
	return (
		<>
			<div className="flex gap-6 items-cetner w-full">
				<Input id="search" name="search" placeholder="Search" />

				<div className="flex items-center">22/33</div>

				<Button
					onClick={() => {
						setAddModalOpen(true);
					}}
					className="my-2 flex justify-between items-center w-auto gap-2"
				>
					<span>Add</span> <Plus />
				</Button>
			</div>

			<Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
				<div className="p-2">
					<div className="controls w-full flex items-center justify-end mb-4">
						<Button
							onClick={() => setAddModalOpen(false)}
							size={'icon'}
							aria-label="Reset"
							title="Reset"
						>
							<X className="h-4 w-4 " />
						</Button>
					</div>
					<Input
						type="text"
						id="url"
						name="url"
						withLabel={true}
						label="Original URL"
						value={input}
						onChange={evt => setInput(evt.target.value)}
					/>
					<Button onClick={onClick}>Add URl</Button>
				</div>
			</Modal>
		</>
	);
}

export default URLControls;
