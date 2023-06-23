'use client';

import React from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginType } from '@/lib/validators/login';
import api from '@/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
	const router = useRouter();

	const { register, handleSubmit } = useForm<LoginType>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit = async ({ masterkey, instanceUrl }: LoginType) => {
		Cookies.set('masterKey', masterkey);
		Cookies.set('instanceUrl', instanceUrl);
		try {
			const res = await api.apiKeys.createKey();
			if (res) {
				Cookies.set('apiKey', res);
				router.push('/dashboard');
			} else {
				Cookies.remove('masterKey');
				Cookies.remove('instanceUrl');
				Cookies.remove('apiKey');
			}
		} catch (err) {
			console.error(err);
			toast.error('error');
			Cookies.remove('masterKey');
			Cookies.remove('instanceUrl');
			Cookies.remove('apiKey');
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-2xl text-primary border border-primary rounded-lg p-10"
		>
			<Input
				{...register('masterkey')}
				label="Master Key"
				withLabel={true}
				placeholder="Master Key"
				type="text"
				id="masterKey"
			/>
			<Input
				{...register('instanceUrl')}
				label="Instance Url"
				withLabel={true}
				placeholder="Instance Url"
				type="text"
				id="instanceUrl"
			/>
			<Button type="submit" className="mt-8">
				Sign in
			</Button>
		</form>
	);
};

export default LoginForm;
