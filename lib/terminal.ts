export class CommandArgs {
  public flags: Map<string, string | undefined> = new Map();
  public params: string[] = [];

  public addFlag = (key: string, value?: string) => {
    this.flags.set(key, value);
  };

  public addParam = (param: string) => {
    this.params.push(param);
  };
}

export type TerminalCtx = {
  username: string;
  hostname: string;
};

export type TerminalStatus = 'idle' | 'processing';

/**
 * Removes all trailing dashes from string
 * @param flag
 * @returns Sanitized string
 */
export const sanitizeFlag = (flag: string): string => {
  const re = new RegExp(/-+?/, 'g');
  return flag.replace(re, '');
};

/**
 * Creates a new argument map object for easier access
 * @param args
 * @returns
 */
export const parseArgs = (args: string[]): CommandArgs => {
  const cmdArgs = new CommandArgs();

  const internalArgs = [...args];
  if (internalArgs.length === 0) {
    return cmdArgs;
  }

  while (internalArgs.length > 0) {
    const arg = internalArgs.shift() as string;

    if (arg.includes('=')) {
      const [actualFlag, value] = arg.split('=');
      cmdArgs.addFlag(sanitizeFlag(actualFlag), value);
    } else if (arg.startsWith('--')) {
      const value = internalArgs.shift() as string;
      cmdArgs.addFlag(sanitizeFlag(arg), value);
    } else if (arg.startsWith('-')) {
      cmdArgs.addFlag(sanitizeFlag(arg));
    } else {
      cmdArgs.addParam(sanitizeFlag(arg));
    }
  }
  return cmdArgs;
};
