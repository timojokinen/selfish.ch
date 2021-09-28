import { useCommand } from '../hooks/useCommand';
import { TerminalCtx } from '../lib/terminal';

type Props = {
  input: string;
  ctx: TerminalCtx;
  cwd: string;
};

export const Command = ({ ctx, input, cwd }: Props) => {
  const { command, output } = useCommand(input);

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
