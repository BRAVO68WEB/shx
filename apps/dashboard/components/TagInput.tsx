import React, { FormEventHandler, useRef } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface TagInput {
	tags: string[];
	onAddTags: (value: string) => void;
	onChange: (value: string[]) => void;
	placeholder?: string;
}

function TagInput({ tags, placeholder, onAddTags, onChange }: TagInput) {
	const inputRef = useRef<HTMLInputElement>(null);
	const onSubmit: FormEventHandler<HTMLFormElement> = evt => {
		evt.preventDefault();
		if (inputRef.current?.value && inputRef.current.value.trim() !== '') {
			onAddTags(inputRef.current.value);
			inputRef.current.value = '';
		}
	};
	const onDelete = (i: number) => {
		onChange(tags.filter((_tag, index) => i !== index));
	};
	return (
		<div className="w-full flex flex-wrap gap-2">
			{tags.map((tag, index) => (
				<Button
					onClick={() => onDelete(index)}
					key={index}
					className="rounded w-min m-0 items-center"
				>
					{tag}
				</Button>
			))}

			<form onSubmit={onSubmit} className="w-40">
				<Input
					ref={inputRef}
					type="text"
					placeholder={placeholder}
					className="text-lg h-full my-0 p-2"
				/>
				<button hidden type="submit" />
			</form>
		</div>
	);
}

export default TagInput;
