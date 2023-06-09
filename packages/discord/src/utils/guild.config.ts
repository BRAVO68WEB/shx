import { GuildConfig } from '../sturctures/database';

const MYGuildConfig: GuildConfig = {
	prefix: 'x!',
	serverId: process.env.DEV_GUILD_ID as string,
	commands: {
		global: {
			disabled: [],
			disabledCatagories: [],
			customCooldown: [],
		},
		userDisabled: [],
		roleDisabled: [],
		channelDisabled: [],
	},
	antiSpam: {
		enabled: true,
		whitelistedUsers: [],
		whitelistedRoles: [],
		whitelistedChannels: [],
		inviteLinks: {
			enabled: true,
			whitelistedUsers: [],
			whitelistedRoles: [],
			whitelistedChannels: [],
		},
		mentions: {
			enabled: true,
			maxmiumCheck: {
				enabled: true,
				value: 5,
			},
			publicRoleCheck: true,
			whitelistedUsers: [],
			whitelistedRoles: [],
			whitelistedChannels: [],
		},
	},
	thread: {
		listen: true,
	},
	snipe: {
		channelDisabled: [],
	},
};

export default MYGuildConfig;
