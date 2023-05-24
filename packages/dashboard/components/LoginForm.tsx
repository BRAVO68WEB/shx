'use client';

import React, { FormEventHandler } from 'react';
import Button from './ui/Button';

const LoginForm = () => {

    const onSubmit:FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
    }

	return (
		<form onSubmit={onSubmit} className="w-full max-w-2xl text-primary border border-primary rounded-lg p-10">
			<div>
				<label htmlFor="email" className="block text-sm font-medium leading-6">
					Master Key
				</label>
				<input
					type="text"
					name="masterKey"
					id="masterKey"
					className="block my-2 bg-transparent w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
					placeholder="Master Key"
				/>
			</div>
			<Button
				type="submit"
                className='mt-8'
			>
				Sign in
			</Button>
		</form>
	);
};

export default LoginForm;
