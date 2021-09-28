import { useEffect, useRef, useState } from 'react';
import { TerminalCtx } from '../lib/terminal';

type Props = {
  ctx: TerminalCtx;
  cwd: string;
  onSubmit: (input: string) => void;
};

export const CommandLineInput = ({ ctx, cwd, onSubmit }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(input);
    setInput('');
  };

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <div className="flex items-center">
      <div className="select-none">
        <span className="font-bold text-green-500">
          {ctx.username}@{ctx.hostname}
        </span>
        :<span className="font-bold text-blue-500">{cwd}</span>$
      </div>
      <form onSubmit={handleSubmit} className="flex-auto">
        <input
          name="command"
          type="text"
          value={input}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setInput(evt.currentTarget.value)}
          ref={ref}
          autoComplete="off"
          className="inline-block pl-2 w-full bg-transparent outline-none"
        />
      </form>
    </div>
  );
};
