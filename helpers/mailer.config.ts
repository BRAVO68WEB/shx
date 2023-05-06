import { configKeys } from "..";

export interface MailConfig {
	host?: string;
	port?: number;
	secure?: boolean;
	auth?: {
		user: string;
		pass: string;
	};
	logger?: boolean;
}

type MailerConfigValues = {
	[k: string]: MailConfig & Partial<ExtraMailerConfig>;
};

interface ExtraMailerConfig {
	from_email: string;
	from_name: string;
}

const ConfigValue: MailerConfigValues = {
	development: {
		host: configKeys.MAIL_HOST,
		port: configKeys.MAIL_PORT,
		secure: false,
		auth: {
			user: configKeys.MAIL_USER,
			pass: configKeys.MAIL_PASS,
		},
		logger: configKeys.MAIL_LOGGER,
		from_email: configKeys.MAIL_FROM_EMAIL,
		from_name: configKeys.MAIL_FROM_NAME,
	},
	production: {
		host: configKeys.MAIL_HOST,
		port: configKeys.MAIL_PORT,
		secure: false,
		auth: {
			user: configKeys.MAIL_USER,
			pass: configKeys.MAIL_PASS,
		},
		logger: configKeys.MAIL_LOGGER,
		from_email: configKeys.MAIL_FROM_EMAIL,
		from_name: configKeys.MAIL_FROM_NAME,
	},
};

export default ConfigValue;
