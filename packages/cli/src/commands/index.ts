import { Command } from 'commander';
import infoCMD from './info';
import configCMD from './config';
import gistCMD from './gist';
import urlShrinkCMD from './urlShrink';
import uploadCMD from './upload';

export class LoadCommads {
	constructor(program: Command) {
		this.info(program);
		this.config(program);
		this.gist(program);
		this.urlShrink(program);
		this.upload(program);
	}

	public info = (program: Command) => {
		return infoCMD(program);
	};

	private config = (program: Command) => {
		return configCMD(program);
	};

	private gist = (program: Command) => {
		return gistCMD(program);
	};

	private urlShrink = (program: Command) => {
		return urlShrinkCMD(program);
	};

	private upload = (program: Command) => {
		return uploadCMD(program);
	};
}
