import { useCallback } from 'react';
import { useCommand } from '../hooks/useCommand';
import { TerminalCtx } from '../lib/terminal';

type Props = {
  input: string;
  ctx: TerminalCtx;
  cwd: string;
  onComplete?: (processId: string) => void;
  processId: string;
};

export const Command = ({ ctx, input, cwd, onComplete, processId }: Props) => {
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete(processId);
    }
  }, [processId, onComplete]);

  const { command, output } = useCommand(input, handleComplete);

  return (
    <div>
      <div className="flex select-none">
        <span className="mr-2">
          <span className="font-bold text-green-500">
            {ctx.username}@{ctx.hostname}
          </span>
          :<span className="font-bold text-blue-500">{cwd}</span>$
        </span>
        <span>{command}</span>
      </div>
      {output}
    </div>
  );
};
