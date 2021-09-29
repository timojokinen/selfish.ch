import { CommandArgs, TerminalCtx } from '../lib/terminal';
import changeDirectory from './ChangeDirectory';
import listDirectoryContents from './ListDirectoryContents';

const commands = new Map<string, (args: CommandArgs, ctx: TerminalCtx, cwd: string) => AsyncGenerator>([
  ['ls', listDirectoryContents],
  ['cd', changeDirectory],
]);

export default commands;
