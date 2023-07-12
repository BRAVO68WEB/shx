import 'dotenv/config';
import chalk from 'chalk';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

import './validate-env';

import { Bot } from './bot';
import { isDev } from './utils/constants';

// Check NODE Version
const nodeVersions = process.versions.node.split('.');
if (Number(nodeVersions[0]) <= 16 && Number(nodeVersions[1]) < 9) {
	throw new Error(
		'Node.js version must be 16.9.0 higher. Please update your Node.js version.'
	);
}

process.setMaxListeners(15);

// If instacne is not production mode.
if (isDev) {
	const log = console.log;

	log(chalk.bold.red('DEVELOPMENT / MAINTAINANCE MODE'));
	log(
		chalk.red.bold('Some production features will be disrupted or terminated.')
	);
} else {
	process.on('uncaughtException', console.error);
	process.on('unhandledRejection', console.error);
}

export const bot = new Bot(
	new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.DirectMessages,
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.GuildVoiceStates,
			GatewayIntentBits.GuildMessageReactions,
		],
		allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
		partials: [
			Partials.User,
			Partials.Channel,
			Partials.Message,
			Partials.GuildMember,
		],
	})
);
