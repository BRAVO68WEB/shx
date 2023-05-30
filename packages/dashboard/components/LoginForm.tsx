'use client';

import React, { FormEventHandler } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

const LoginForm = () => {

    const onSubmit:FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
    }

	return (
		<form
			onSubmit={onSubmit}
			className="w-full max-w-2xl text-primary border border-primary rounded-lg p-10"
		>
			<Input
				label="Master Key"
				withLabel={true}
				placeholder="Master Key"
				type="text"
				name="masterKey"
				id="masterKey"
			/>
			<Button type="submit" className="mt-8">
				Sign in
			</Button>
		</form>
	);
};

export default LoginForm;
