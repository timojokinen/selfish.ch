import { useEffect } from 'react';
import { useTerminalContext } from '../components/TerminalProvider';
import { NoSuchFileOrDirectory } from '../errors/NoSuchFileOrDirectory';
import { NotADirectory } from '../errors/NotADirectory';
import fs, { Directory } from '../lib/filesystem';

import { CommandArgs, TerminalCtx } from '../lib/terminal';
import { createAbsolutePath } from '../lib/util';

type ChangeDirectoryProps = {
  path: string;
};

const ChangeDirectory = ({ path }: ChangeDirectoryProps) => {
  const { setCwd } = useTerminalContext();
  useEffect(() => {
    setCwd(path);
  }, [path, setCwd]);
  return null;
};

export default async function* changeDirectory(args: CommandArgs, ctx: TerminalCtx, cwd: string) {
  let idx = 0;
  let path = cwd;

  try {
    if (args.params.length > 0) {
      const p = createAbsolutePath(cwd, args.params[0]);
      if (p === '') {
        return;
      }

      const node = fs.exists(p);
      if (node && node instanceof Directory) {
        path = p;
        yield <ChangeDirectory key={idx++} path={path} />;
      } else if (node) {
        throw new NotADirectory(p);
      } else {
        throw new NoSuchFileOrDirectory(p);
      }
    }
  } catch (err) {
    console.error(err);
    yield <div key={idx++}>{err.message}</div>;
  }
}
