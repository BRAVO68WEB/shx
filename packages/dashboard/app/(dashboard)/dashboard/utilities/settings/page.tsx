'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TagInput from '@/components/TagInput';
import api from '@/api';

function Page() {
	const [settings, setSettings] = useState<ISettings>({
		imageExtensions: [],
		fileExtensions: [],
		theme: '',
		language: '',
	});

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
		setSettings(res)
	};

	useEffect(() => {
		getSettings();
	}, []);

	return (
		<div className="flex flex-col gap-8 w-full mt-10">
			<div>
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
					defaultValue="dark"
					value={settings.theme}
				>
					<option value={'dark'}>Dark</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="Language"
					className="block text-sm font-medium leading-6 text-white"
				>
					Language
				</label>
				<select
					id="Language"
					name="Language"
					className="mt-2 bg-transparent block w-full rounded-md py-1.5 pl-3 pr-10 text-white sm:text-sm sm:leading-6 border border-primary"
					defaultValue="en"
					value={settings.language}
				>
					<option value={'en'}>English</option>
				</select>
			</div>
			<div className="flex items-center w-full">
				<Input
					id="instance-url"
					withLabel
					label="Instance URL"
					type="text"
					className="w-full"
				/>
			</div>
			<TagInput
				tags={settings.imageExtensions}
				onAddTags={addImageExt}
				placeholder="Image Extensions"
			/>
			<TagInput
				tags={settings.fileExtensions}
				onAddTags={addFileExt}
				placeholder="File Extensions"
			/>
			<Button>Save</Button>
		</div>
	);
}

export default Page;
