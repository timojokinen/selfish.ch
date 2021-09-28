import { useCallback, useEffect, useState } from 'react';
import commands from '../commands';
import { parseArgs } from '../lib/terminal';

type CommandNotFoundProps = {
  cmd: string;
};

const CommandNotFound = ({ cmd }: CommandNotFoundProps) => {
  return <div>{cmd}: command not found.</div>;
};

export const useCommand = (input: string, onComplete?: () => void) => {
  const [output, setOutput] = useState<unknown[]>([]);
  const [command] = input.split(' ');

  const run = useCallback(async () => {
    const [cmd, ...rawArgs] = input.split(' ');
    const args = parseArgs(rawArgs);

    if (!commands.has(cmd)) {
      setOutput((oldOutput) => [...oldOutput, <CommandNotFound key="not-found" cmd={cmd} />]);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const command = commands.get(cmd);
    if (command) {
      const generator = command(args);

      for await (const val of generator) {
        setOutput((oldOutput) => [...oldOutput, val]);
      }
      if (onComplete) {
        onComplete();
      }
    }
  }, [input, onComplete]);

  useEffect(() => {
    run();
  }, [run]);

  return { command, output };
};
