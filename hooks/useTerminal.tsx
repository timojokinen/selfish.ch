import React, { useState } from 'react';
import { Command } from '../components/Command';
import { parseArgs, TerminalCtx } from '../lib/terminal';

export const useTerminal = () => {
  const [ctx, setCtx] = useState<TerminalCtx>({
    username: 'selfish',
    hostname: 'kali',
  });
  const [cwd, setCwd] = useState('~');
  const [output, setOutput] = useState<React.ReactNode[]>([]);

  const runCommand = (input: string): void => {
    setOutput((o) => [...o, <Command key={new Date().getTime()} input={input} ctx={ctx} cwd={cwd} />]);
  };

  return { runCommand, cwd, ctx, output };
};
