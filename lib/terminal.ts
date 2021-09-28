import React from 'react';

export type CommandArgs = Map<string, string | string[]>;

export type TerminalCtx = {
  username: string;
  hostname: string;
};

export type LogRecord = {
  ctx: TerminalCtx;
  timestamp: Date;
  input?: string;
  output?: string | React.ReactNode;
};

export const sanitizeFlag = (flag: string): string => {
  const re = new RegExp(/-+?/, 'g');
  return flag.replace(re, '');
};

export const parseArgs = (args: string[]): CommandArgs => {
  let internalArgs = [...args];
  if (internalArgs.length === 0) {
    return new Map();
  }

  const parsedArgs = new Map<string, string | string[]>();

  while (internalArgs.length > 0) {
    const [flag, ...rest] = internalArgs;

    if (flag.includes('=')) {
      const [actualFlag, value] = (internalArgs.shift() as string).split('=');
      parsedArgs.set(sanitizeFlag(actualFlag), value);
    } else {
      let nextFlagIdx = rest.findIndex((arg) => arg.startsWith('-'));
      if (nextFlagIdx === -1) nextFlagIdx = internalArgs.length;

      const args = rest.slice(0, nextFlagIdx);
      internalArgs = rest.slice(nextFlagIdx, rest.length);

      parsedArgs.set(sanitizeFlag(flag), args);
    }
  }

  return parsedArgs;
};
