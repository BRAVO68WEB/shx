import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder } from 'discord.js';

import type { SlashCommand } from '../../sturctures/command';

export const command: SlashCommand = {
	slashData: new SlashCommandBuilder()
		.setName('list-apikey')
		.setDescription("List API Key's for SHX instance."),
	run: async ({ interaction }) => {
		const embed = new EmbedBuilder().setDescription(
			`**API Key for SHX instance:**`
		);

		await interaction.reply({
			embeds: [embed],
			components: [
				{
					type: 1,
					components: [
						{
							style: 5,
							label: `Delete`,
							url: process.env.SHX_DASH_URL + '/dashboard/config',
							emoji: {
								name: `🏮`,
							},
							type: 2,
						},
					],
				},
			],
		});
	},
};
