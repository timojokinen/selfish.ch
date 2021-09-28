import { CommandArgs } from '../lib/terminal';
import listDirectoryContents from './list-directory-contents.command';

const commands = new Map<string, (args: CommandArgs) => AsyncGenerator>([['ls', listDirectoryContents]]);

export default commands;
