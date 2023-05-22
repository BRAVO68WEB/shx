#!/usr/bin/env node
import { Command } from 'commander';
import { loadCommads } from './commands';
import Configstore from 'configstore';

const configFile = new Configstore(
    'shx-cli',
)

const program = new Command();

new loadCommads(program);

program.parse(process.argv);

export { configFile }