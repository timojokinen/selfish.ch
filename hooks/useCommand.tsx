import { useCallback, useEffect, useState } from 'react';
import commands from '../commands';
import { parseArgs } from '../lib/terminal';

export const useCommand = (input: string) => {
  const [output, setOutput] = useState<unknown[]>([]);
  const [command] = input.split(' ');

  const run = useCallback(async () => {
    const [cmd, ...rawArgs] = input.split(' ');
    const args = parseArgs(rawArgs);

    if (!commands.has(cmd)) {
      return setOutput((oldOutput) => [...oldOutput, <div key={new Date().getTime()}>{cmd}: command not found.</div>]);
    }

    const command = commands.get(cmd);
    if (command) {
      for await (const val of command(args)) {
        setOutput((oldOutput) => [...oldOutput, val]);
      }
    }
  }, [input]);

  useEffect(() => {
    run();
  }, [run]);

  return { command, output };
};
