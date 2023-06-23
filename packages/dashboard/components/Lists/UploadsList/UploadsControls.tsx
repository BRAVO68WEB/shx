import api from '@/api';
import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Edit, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface UploadControlsProps {
	onEditClick: () => void;
	onAddFile: (file: IFile) => void;
	onSearchInputChange: (input: string) => void;
}

function UploadsControls({
	onEditClick,
	onAddFile,
	onSearchInputChange,
}: UploadControlsProps) {
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	const [fileUpload, setFileUpload] = useState<File | null>(null);

	const fileInputChange: React.ChangeEventHandler<
		HTMLInputElement
	> = async evt => {
		if (evt.target.value) {
			try {
				const file = evt.target.files ? evt.target.files[0] : null;
				setFileUpload(file);
				if (!file) return;
				const res = await api.uploads.uploadSingleFile({ file });
				onAddFile(res);
			} catch {
				toast.error('Error Uploading File');
			} finally {
				setFileUpload(null);
				setUploadModalOpen(false);
			}
		}
	};

	return (
		<>
			<div className="flex gap-6 items-cetner w-full">
				<Input
					id="search"
					name="search"
					placeholder="Search"
					onChange={evt => onSearchInputChange(evt.target.value)}
				/>

				<div className="flex items-center">22/33</div>

				<Button
					onClick={() => {
						setUploadModalOpen(true);
					}}
					className="my-2 flex justify-between items-center w-auto gap-2"
				>
					<span>Add</span> <Plus />
				</Button>
				<Button
					onClick={() => {
						onEditClick();
					}}
					className="my-2 flex justify-between items-center w-auto gap-2"
				>
					<span>Edit</span> <Edit />
				</Button>
			</div>

			<Modal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
				<div className="flex-col flex items-center  p-2 gap-3">
					<div className="controls w-full flex items-center justify-end">
						<Button
							onClick={() => setUploadModalOpen(false)}
							size={'icon'}
							aria-label="Reset"
							title="Reset"
						>
							<X className="h-4 w-4 " />
						</Button>
					</div>

					<label
						htmlFor="fileUpload"
						className="input w-full h-40 border-primary border flex justify-center items-center"
					>
						{fileUpload ? (
							<img
								src={URL.createObjectURL(fileUpload)}
								alt="file"
								className="w-full h-full object-contain object-center"
							/>
						) : (
							<p>Upload</p>
						)}
					</label>
					<input
						onChange={fileInputChange}
						type="file"
						hidden
						multiple={false}
						id="fileUpload"
					/>
				</div>
			</Modal>
		</>
	);
}

export default UploadsControls;
