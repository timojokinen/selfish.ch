import { CommandArgs, TerminalCtx } from '../lib/terminal';

import fs, { FSNode } from '../lib/filesystem';
import { createAbsolutePath } from '../lib/util';

type Props = {
  options: {
    showHidden: boolean;
  };
  fsNodes: FSNode[];
};

const ListDirectoryContentsOutput = ({ options, fsNodes }: Props) => {
  const data = options.showHidden
    ? fsNodes.map((node) => <span key={node.name}>{node.name}</span>)
    : fsNodes.filter((node) => !node.name.startsWith('.')).map((node) => <span key={node.name}>{node.name}</span>);

  return <div className="space-x-6">{data}</div>;
};

export default async function* listDirectoryContents(args: CommandArgs, ctx: TerminalCtx, cwd: string) {
  let idx = 0;

  try {
    const fsNodes: FSNode[] =
      args.params.length > 0 ? fs.readdir(createAbsolutePath(cwd, args.params[0])) : fs.readdir(cwd);
    yield <ListDirectoryContentsOutput fsNodes={fsNodes} options={{ showHidden: args.flags.has('a') }} key={idx++} />;
  } catch (err) {
    console.error(err);
    yield <div key={idx++}>{err.message}</div>;
  }
}
