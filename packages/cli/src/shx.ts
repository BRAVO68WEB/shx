#!/usr/bin/env node
import { Command } from 'commander';
import { loadCommads } from './commands';

const program = new Command();

new loadCommads(program);

program.parse(process.argv);
