import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { configKeys } from '..';

import MailerConfig from './mailer.config';

const mailConfig =
	configKeys.NODE_ENV === 'production'
		? MailerConfig.production
		: MailerConfig.development;

const transporter = nodemailer.createTransport(mailConfig);

export default async (mail: Mail.Options): Promise<void> => {
	try {
		await transporter.sendMail(mail);
	} catch (err) {
		console.log(err);
	}
};