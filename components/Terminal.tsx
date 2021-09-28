import React, { useEffect, useRef, useState } from 'react';
import { useTerminalContext } from './TerminalProvider';

export const Terminal = () => {
  const { cwd, ctx, output, runCommand } = useTerminalContext();
  const [input, setInput] = useState('');

  const commandInputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    runCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef && terminalRef.current) {
      terminalRef.current.scrollTo(0, terminalRef.current?.scrollHeight);
    }
  }, [output]);

  return (
    <div
      className="flex overflow-hidden relative flex-col w-[900px] h-[500px] bg-[#151718] rounded-md shadow-md"
      onClick={() => {
        commandInputRef?.current?.focus();
      }}
    >
      <div className="flex gap-2 items-center p-4">
        <div className="w-3 h-3 bg-red-500 hover:bg-red-700 rounded-full shadow-md transition-all duration-100 cursor-pointer"></div>
        <div className="w-3 h-3 bg-yellow-500 hover:bg-yellow-700 rounded-full transition-all duration-100 cursor-pointer"></div>
        <div className="w-3 h-3 bg-green-500 hover:bg-green-700 rounded-full transition-all duration-100 cursor-pointer"></div>
      </div>
      <div className="overflow-y-scroll flex-auto items-start p-4 font-mono text-white bg-[#0d0e0f]" ref={terminalRef}>
        <div>{output}</div>
        <div className="flex items-center">
          <div className="select-none">
            <span className="font-bold text-green-500">
              {ctx.username}@{ctx.hostname}
            </span>
            :<span className="font-bold text-blue-500">{cwd}</span>$
          </div>
          {
            <form onSubmit={handleCommand} className="flex-auto">
              <input
                name="command"
                type="text"
                value={input}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setInput(evt.currentTarget.value)}
                ref={commandInputRef}
                autoComplete="off"
                className="inline-block pl-2 w-full bg-transparent outline-none"
              />
            </form>
          }
        </div>
      </div>
    </div>
  );
};
