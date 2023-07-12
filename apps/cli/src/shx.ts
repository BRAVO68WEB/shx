#!/usr/bin/env node
process.removeAllListeners('warning');
import { Command } from 'commander';
import { LoadCommads } from './commands';
import Configstore from 'configstore';

const configFile = new Configstore('shx-cli');

const program = new Command();

new LoadCommads(program);

program.parse(process.argv);

export { configFile };
