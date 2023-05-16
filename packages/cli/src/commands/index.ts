import { Command } from 'commander';
import infoCMD from './info';

export class loadCommads {
	constructor(program: Command) {
		this.info(program);
	}

	public info = (program: Command) => {
		return infoCMD(program);
	};
}
