'use client';

import React, { ChangeEventHandler, useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import TagInput from '@/components/TagInput';
import api from '@/api';
import { toast } from 'react-hot-toast';

function Page() {
	const [settings, setSettings] = useState<ISettings>({
		imageExtensions: [],
		fileExtensions: [],
		theme: '',
		language: '',
	});

	const onChangeInput: ChangeEventHandler<
		HTMLInputElement | HTMLSelectElement
	> = evt => {
		const { name, value } = evt.target;
		setSettings(old => ({
			...old,
			[name]: value,
		}));
	};

	const addImageExt = (tag: string) => {
		setSettings(old => {
			return {
				...old,
				imageExtensions: [...old.imageExtensions, tag],
			};
		});
	};
	const addFileExt = (tag: string) => {
		setSettings(old => {
			return {
				...old,
				fileExtensions: [...old.fileExtensions, tag],
			};
		});
	};

	const getSettings = async () => {
		const res = await api.settings.getCurrentSettings();
		setSettings(res);
	};

	const updateSettings = async (key: string, value: string | string[]) => {
		try {
			await api.settings.updateASetting(key, value);
		} catch (err) {
			console.error(err);
			toast.error('error updating setting');
		}
	};

	useEffect(() => {
		getSettings();
	}, []);

	return (
		<div className="flex flex-col gap-8 w-full mt-10">
			<div className="flex items-center gap-4 w-full">
				<div className="w-full">
					<label
						htmlFor="theme"
						className="block text-sm font-medium leading-6 text-white"
					>
						Theme
					</label>
					<select
						id="theme"
						name="theme"
						className="mt-2 block w-full bg-transparent rounded-md py-1.5 pl-3 pr-10 text-white sm:text-sm sm:leading-6 border-primary border"
						value={settings.theme}
						onChange={onChangeInput}
					>
						<option value={'dark'}>Dark</option>
					</select>
				</div>
				<Button
					onClick={() => updateSettings('theme', settings.theme)}
					className="w-20 h-min mt-auto"
				>
					Save
				</Button>
			</div>
			<div className="flex w-full items-center gap-4">
				<div className="w-full">
					<label
						htmlFor="Language"
						className="block text-sm font-medium leading-6 text-white"
					>
						Language
					</label>
					<select
						id="Language"
						name="language"
						className="mt-2 bg-transparent block w-full rounded-md py-1.5 pl-3 pr-10 text-white sm:text-sm sm:leading-6 border border-primary"
						value={settings.language}
						onChange={onChangeInput}
					>
						<option value={'en'}>English</option>
					</select>
				</div>
				<Button
					onClick={() => updateSettings('language', settings.language)}
					className="w-20 h-min mt-auto"
				>
					Save
				</Button>
			</div>
			<div className="flex gap-4">
				<TagInput
					tags={settings.imageExtensions}
					onAddTags={addImageExt}
					placeholder="Image Extensions"
					onChange={value =>
						setSettings(old => {
							return { ...old, imageExtensions: value };
						})
					}
				/>

				<Button
					onClick={() =>
						updateSettings('imageExtensions', settings.imageExtensions)
					}
					className="w-20 h-min "
				>
					Save
				</Button>
			</div>
			<div className="flex gap-2">
				<TagInput
					tags={settings.fileExtensions}
					onAddTags={addFileExt}
					placeholder="File Extensions"
					onChange={value =>
						setSettings(old => {
							return { ...old, fileExtensions: value };
						})
					}
				/>
				<Button
					onClick={() =>
						updateSettings('fileExtensions', settings.fileExtensions)
					}
					className="w-20 h-min "
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default Page;
