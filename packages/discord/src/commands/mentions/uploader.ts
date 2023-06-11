import { Message, Embed, EmbedBuilder } from 'discord.js';
import axios from 'axios';

export const handleAttachmentUpload = async (message: Message) => {
	await message.reply({ content: 'Processing your File ↗️' });
	await message.react('👍');
	try {
		const reqUploadData = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.SHX_API_URL + '/upload/file-from-url',
			headers: {
				'Content-Type': 'application/json',
				'x-shx-api-key': process.env.SHX_API_TOKEN,
			},
			data: {
				url: message.attachments.first()?.url ?? '',
			},
		};
		const { data } = await axios(reqUploadData);

		const shortURLData = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.SHX_API_URL + '/url',
			headers: {
				'Content-Type': 'application/json',
				'x-shx-api-key': process.env.SHX_API_TOKEN,
			},
			data: {
				url: data.data.url,
			},
		};

		const { data: shortURL } = await axios(shortURLData);

		const statementMsg = new EmbedBuilder()
			.setTitle('File Uploaded')
			.setDescription('Your file has been uploaded to the SHX API.')
			.setColor('#00ff00')
			.setTimestamp()
			.addFields(
				{
					name: 'File Name',
					value: message.attachments.first()?.name ?? 'Unknown',
					inline: true,
				},
				{
					name: 'File Delete URL',
					value:
						process.env.SHX_API_URL +
						'/upload/delete/' +
						data.data.fileID +
						'?token=' +
						data.data.deleteToken,
				},
				{
					name: 'File Short URL',
					value: process.env.SHX_API_URL + '/' + shortURL.data.short_key,
				}
			);

		await message.reply({
			embeds: [statementMsg],
			components: [
				{
					type: 1,
					components: [
						{
							style: 5,
							label: `Delete`,
							url:
								process.env.SHX_API_URL +
								'/upload/delete/' +
								data.data.fileID +
								'?token=' +
								data.data.deleteToken,
							emoji: {
								name: `🏮`,
							},
							type: 2,
						},
						{
							style: 5,
							label: `Open`,
							disabled: false,
							url: data.data.url,
							emoji: {
								name: `↗`,
							},
							type: 2,
						},
					],
				},
			],
		});
	} catch (error: any) {
		console.log(error);
		await message.reply('```' + JSON.stringify(error, null, 2) + '```');
	}
};
