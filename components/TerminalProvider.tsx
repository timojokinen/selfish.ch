import React from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { TerminalCtx } from '../lib/terminal';

type TerminalContextValue = {
  runCommand: (input: string) => void;
  ctx: TerminalCtx;
  cwd: string;
  output: React.ReactNode[];
};

export const TerminalContext = React.createContext<TerminalContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const useTerminalContext = () => {
  const context = React.useContext(TerminalContext);

  if (context === undefined) {
    throw Error('Unexpected use of TerminalContext.');
  }

  return context;
};

export const TerminalProvider = ({ children }: Props) => {
  const value = useTerminal();

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
};
