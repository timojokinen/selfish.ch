import React, { useCallback, useMemo, useState } from 'react';
import { Command } from '../components/Command';
import { TerminalCtx, TerminalStatus } from '../lib/terminal';

export const useTerminal = () => {
  const [ctx, setCtx] = useState<TerminalCtx>({
    username: 'selfish',
    hostname: 'kali',
  });
  const [cwd, setCwd] = useState('~');
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [processes, setProcesses] = useState<string[]>([]);
  const status = useMemo<TerminalStatus>(() => (processes.length > 0 ? 'processing' : 'idle'), [processes]);

  const runCommand = useCallback(
    (input: string): void => {
      const processId = Math.random().toString(16).slice(2);
      setProcesses((prev) => [...prev, processId]);
      const handleComplete = (id: string) => {
        setProcesses((prev) => prev.filter((process) => process !== id));
      };

      setOutput((o) => [
        ...o,
        <Command key={processId} processId={processId} input={input} ctx={ctx} cwd={cwd} onComplete={handleComplete} />,
      ]);
    },
    [ctx, cwd],
  );

  return { runCommand, cwd, ctx, output, status };
};
