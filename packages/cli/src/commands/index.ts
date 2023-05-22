import { Command } from 'commander';
import infoCMD from './info';
import configCMD from './config';
import gistCMD from './gist';

export class loadCommads {
	constructor(program: Command) {
		this.info(program);
		this.config(program);
		this.gist(program);
	}

	public info = (program: Command) => {
		return infoCMD(program);
	};

	public config = (program: Command) => {
		return configCMD(program);
	}

	public gist = (program: Command) => {
		return gistCMD(program);
	}
}
