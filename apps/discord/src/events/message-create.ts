import type { Message, PermissionResolvable, TextChannel } from 'discord.js';

import type { TextCommand } from '../sturctures/command';
import type { GuildConfig } from '../sturctures/database';
import type { DiscordEvent } from '../sturctures/event';
import { cooldownCache } from '../utils/cache';
import { getCommandHelpInfo, resembleCommandCheck } from '../utils/cmds';
import { isDev } from '../utils/constants';
import { parseMsToVisibleText } from '../utils/formatters';
import { callbackEmbed } from '../utils/messages';
import MYGuildConfig from '../utils/guild.config';
import { handleAttachmentUpload } from '../commands/mentions/uploader';

async function reject(message: Message, usage: string, missing: string) {
	const postMessage = await message.reply({
		content: `Usage: \`${usage}\`\nMissing: \`${missing}\``,
		allowedMentions: { repliedUser: true },
	});

	setTimeout(() => {
		if (postMessage.deletable) postMessage.delete().catch(() => undefined);
	}, 6000);
}

export const event: DiscordEvent = {
	name: 'messageCreate',
	// eslint-disable-next-line
	run: async (message: Message) => {
		const {
			content,
			channel,
			author,
			webhookId,
			member,
			guild,
			client,
			attachments,
		} = message;

		if (
			author.bot ||
			channel.isVoiceBased() ||
			webhookId ||
			author.id === client.user.id
		)
			return;

		const prefix = 'x!';

		if (guild) {
			if (!member) await guild.members.fetch(author.id);
		}

		const guildDatabase: GuildConfig = MYGuildConfig;

		const mentionReg = new RegExp(`^(<@!?${client.user.id}>)`);
		const mentionTest = mentionReg.test(content);

		if (attachments && mentionTest) {
			await handleAttachmentUpload(message);
			return;
		}

		if (mentionTest) {
			await channel.send(`Hey! My prefix is \`${prefix}\``);
			return;
		}

		const prefixReg = new RegExp(`^${prefix}`);
		const prefixTest = content.match(prefixReg);
		if (prefixTest) {
			const [prefix] = prefixTest;
			const parsedContent = content.slice(prefix.length);
			if (!parsedContent) return;

			const command = parsedContent.split(' ')[0];
			// Command Content Parsing.
			let cmd: TextCommand | undefined;

			let cmdName = command;

			// Fetch command destination.
			for (let index = 0; index < 2; index++) {
				const commandMatching = client.commands.get(cmdName);
				const aliasesMatching = client.aliases.get(cmdName);

				if (commandMatching) {
					cmd = commandMatching;
					cmdName = cmd?.data.name;
					break;
				} else if (aliasesMatching) {
					cmd = client.commands.get(aliasesMatching);
					if (cmd) {
						cmdName = cmd.data.name;
					}
					break;
				} else {
					if (index === 0) {
						const expectedCommandName = await resembleCommandCheck(
							message,
							cmdName
						);
						if (expectedCommandName) {
							cmdName = expectedCommandName.name;
							message.createdTimestamp += expectedCommandName.timeTaken;
							continue;
						}
					}
					return;
				}
			}
			// Reject if no.
			if (!cmd) return;

			const cmdData = cmd.data;

			/**
			 * Command's eligibility vaildation.
			 */

			if (cmd.enabled === false) return;
			// Reject if not in development mode
			if (cmdData.developmentOnly === true && !isDev) {
				return;
			}

			if (
				cmdData.ownerOnly === true &&
				author.id !== process.env.DISCORD_OWNER_ID
			)
				return;

			// Reject if dm mode while configurated to guild.
			if (!guild && !cmdData.directMessageAllowed) return;

			// Reject if command can executed NSFW channel when it's not in.
			if (
				cmdData.nsfwChannelRequired &&
				(!guild || !channel.isTextBased()) &&
				!(channel as TextChannel).nsfw
			) {
				const cEmbed = callbackEmbed({
					text: 'You must be in **NSFW** channel before executing this commmand.',
					color: 'Red',
					mode: 'error',
				});
				author
					.send({
						embeds: [cEmbed],
					})
					.catch(() => undefined);
				return;
			}

			// Reject if dm mode while configurated to guild.
			if (!guild && !cmdData.directMessageAllowed) return;

			// Reject when Target disabled or didn't pass.
			if (guild) {
				const commandDatasbase = guildDatabase?.commands;
				// GUILD specifies disabled command.
				if (
					!commandDatasbase ||
					commandDatasbase.global.disabled.includes(cmdName)
				) {
					return;
				}

				// Specified CATAGORIES
				if (
					cmd.data.catagory &&
					commandDatasbase.global.disabledCatagories.includes(cmd.data.catagory)
				) {
					return;
				}

				// Specified CHANNEL
				if (
					commandDatasbase.channelDisabled
						.find(x => x.id === channel.id)
						?.cmds.includes(cmdName)
				) {
					author
						.send({
							content: `Command cannot be executed in this channel (#${channel.id})!`,
							allowedMentions: { repliedUser: true },
						})
						.catch(() => undefined);
					return;
				}

				// Specified ROLE
				if (member?.roles.cache) {
					// eslint-disable-next-line no-unsafe-optional-chaining
					for (const role of member.roles.cache) {
						const hasRole = commandDatasbase.roleDisabled
							.find(x => x.id === role[1].id)
							?.cmds.includes(cmdName);
						if (hasRole) return;
					}
				}

				// Specified USER
				if (
					commandDatasbase.userDisabled
						.find(x => x.id === author.id)
						?.cmds.includes(cmdName)
				) {
					author
						.send({
							content: 'You are disabled from executing this command!',
							allowedMentions: { repliedUser: true },
						})
						.catch(() => undefined);
					return;
				}

				if (
					cmd.data.inVoiceChannelRequired === true &&
					!member?.voice.channel
				) {
					const cEmbed = callbackEmbed({
						text: 'You must be in voice channel before executing this commmand.',
						color: 'Red',
						mode: 'error',
					});
					await message.reply({
						embeds: [cEmbed],
					});
					return;
				}
			}

			/**
			 * END of Command's eligibility vaildation.
			 */

			// Cooldown Validation
			const now = Date.now();
			const keyName = `CMD_${author.id}_${cmdName}`;

			const cooldownInterval = cmd.data.cooldownInterval ?? 3000;

			// Reject if user exists in cooldown.
			if (cooldownCache.has(keyName)) {
				const expectedEnd = cooldownCache.get(keyName);
				if (expectedEnd && now < Number(expectedEnd)) {
					const timeleft = parseMsToVisibleText(Number(expectedEnd) - now);
					const postMessage = await message.reply({
						content: `Before using this command, please wait for **${timeleft}**.`,
						allowedMentions: { repliedUser: true },
					});
					setTimeout(() => {
						if (postMessage.deletable)
							postMessage.delete().catch(() => undefined);
					}, 6000);
					return;
				}
			}

			// Set cooldown.
			cooldownCache.set(
				keyName,
				now + cooldownInterval,
				cooldownInterval / 1000
			);

			// Reject if excess usage.
			if (cmd.data.intervalLimit) {
				const key1 = 'INTERVAL' + keyName;

				let doRejection = { is: false, which: '' };
				const customTTL = {
					minute: 60 * 1000,
					hour: 60 * 60 * 1000,
					day: 24 * 60 * 60 * 1000,
				};
				const intervalList = cmd.data.intervalLimit;
				for (const [key, ms] of Object.entries(intervalList)) {
					if (!ms) continue;
					const keyTyped = key as keyof typeof intervalList;
					if (!intervalList[keyTyped]) continue;

					const userFeq = cooldownCache.get(keyTyped + key1) ?? '0';

					// Do Rejection if number reached specified amount of allowed cooldown.
					if (Number(userFeq) === intervalList[keyTyped]) {
						doRejection = { is: true, which: keyTyped };
						break;
					}

					// Set to Database with TTL.
					cooldownCache.set(
						keyTyped + key1,
						(Number(userFeq) + 1).toString(),
						customTTL[keyTyped]
					);
				}

				if (doRejection.is) {
					const postMessage = await message.reply({
						content: `You have reached the maxmium usage in 1 **${doRejection.which}**!`,
						allowedMentions: { repliedUser: true },
					});

					setTimeout(() => {
						if (postMessage.deletable)
							postMessage.delete().catch(() => undefined);
					}, 6000);

					return;
				}
			}

			// Permission Check (BOT)
			const requestPermsClient = cmd.data.clientRequiredPermissions;
			if (guild && requestPermsClient) {
				const permMissing: PermissionResolvable[] = [];
				for (const perm of requestPermsClient) {
					const botId = client.user.id;
					if (botId) {
						const isOwned = guild.members.cache
							.get(botId)
							?.permissions.has(perm);
						if (!isOwned) permMissing.push(perm);
					}
				}

				// Reject if BOT doesn't own permission(s).
				if (permMissing.length > 0) {
					const perms = permMissing
						.map(index => `\`${Number(index)}\``)
						.join(', ');

					await message.reply({
						content: `I don't have **PERMISSIONS**: ${perms}`,
					});

					return;
				}
			}

			// Permission Check (AUTHOR)
			const requestPermsAuthor = cmd.data.authorRequiredPermissions;
			if (guild && requestPermsAuthor) {
				const permMissing: PermissionResolvable[] = [];
				for (const perm of requestPermsAuthor) {
					const isOwned = member?.permissions.has(perm);
					if (!isOwned) permMissing.push(perm);
				}

				// Reject if AUTHOR doesn't own permission(s).
				if (permMissing.length > 0) {
					const perms = permMissing
						.map(index => `\`${Number(index)}\``)
						.join(', ');

					await message.reply({
						content: `You do not have required **PERMISSIONS**: ${perms}`,
					});

					return;
				}
			}

			// Pass
			console.log(
				`[CMD] ${author.tag} executed ${cmdName} in ${guild?.name ?? 'DM'}.`
			);
			const arguments_ = parsedContent.split(' ').slice(1);

			if (arguments_[0] === 'help') {
				if (
					cmd.data.nsfwChannelRequired === true &&
					(channel as TextChannel).nsfw
				) {
					const helpInfo = getCommandHelpInfo(cmd);
					await message.reply({
						embeds: [helpInfo],
					});
				}
				return;
			}

			// Arguments Checking
			const requiredArugments = cmd.data.requiredArgs;
			if (requiredArugments && requiredArugments.length > 0) {
				let usage = `${prefix}${cmd.data.name}`;
				for (const _argument_ of requiredArugments) {
					let namedArguments: string = _argument_.type;
					if (_argument_.type === 'STRING' && _argument_.text) {
						namedArguments = _argument_.text.join(' | ');
					} else if (_argument_.name) {
						namedArguments += `(${_argument_.name})`;
					}
					usage += ` [${namedArguments}]`;
				}

				for (let index = 0, l = requiredArugments.length; index < l; index++) {
					const _argument = requiredArugments[index] as {
						type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'USER' | 'CHANNEL';
						required: boolean;
						text?: string[];
						customLength?: { min: number; max: number };
						rest: boolean;
					};
					const userArgument = arguments_[index];

					switch (_argument.type) {
						case 'STRING': {
							if (_argument.required) {
								if (!userArgument || userArgument.length === 0) {
									return reject(message, usage, index.toString());
								}
								if (_argument.text && !_argument.text.includes(userArgument)) {
									const text = `${index.toString()} (NOT_MATCH)`;
									return reject(message, usage, text);
								}
								if (
									_argument.customLength &&
									(content.length > _argument.customLength.max ||
										content.length < _argument.customLength.min)
								) {
									const text = `${index.toString()} (ERR_Length)`;
									return reject(message, usage, text);
								}
							}
							break;
						}
						case 'NUMBER': {
							if (_argument.required && Number.isNaN(Number(userArgument))) {
								return reject(message, usage, index.toString());
							}
							break;
						}
						default: {
							break;
						}
					}

					if (_argument.rest) break;
				}
			}

			// Run the actual command.
			try {
				return cmd.run({ message, args: arguments_ });
			} catch (error) {
				if (error instanceof Error) console.error(error);
			}
		}
	},
};
