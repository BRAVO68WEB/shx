import React, { FormEventHandler, useRef } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface TagInput{
    tags: string[];
    onAddTags: (value: string) => void;
    placeholder?:string;
}

function TagInput({tags,placeholder,onAddTags}:TagInput) {
    const inputRef =useRef<HTMLInputElement>(null)
    const onSubmit:FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        onAddTags(inputRef.current?.value??"")
    }
	return (
		<div className="w-full flex flex-wrap gap-2">
			{tags.map((tag, index) => (
				<Button key={index} className="rounded w-min m-0 items-center">
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
