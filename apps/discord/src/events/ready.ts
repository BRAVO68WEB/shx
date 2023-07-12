import type { Client } from 'discord.js';
import { ActivityType } from 'discord.js';

import type { DiscordEvent } from '../sturctures/event';

export const event: DiscordEvent = {
	once: true,
	name: 'ready',
	run: (client: Client) => {
		// Dynamic Status
		const text = `to everyone's wishes 🧜🏻‍♀️`;
		client.user?.setActivity(text, {
			type: ActivityType.Listening,
		});
		console.log('🤖 Bot is in ready status!');
	},
};
