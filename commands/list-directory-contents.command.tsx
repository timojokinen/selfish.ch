import { CommandArgs } from '../lib/terminal';

type Props = {
  options: {
    showHidden: boolean;
  };
};

const ListDirectoryContentsOutput = ({ options }: Props) => {
  const output = [
    {
      name: '.bin',
      type: 'directory',
    },
    {
      name: 'repositories',
      type: 'directory',
    },
    {
      name: 'larrybird.sh',
      type: 'file',
    },
  ];

  const data = options.showHidden
    ? output.map((item) => <span key={item.name}>{item.name}</span>)
    : output.filter((t) => !t.name.startsWith('.')).map((item) => <span key={item.name}>{item.name}</span>);

  return <div className="space-x-6">{data}</div>;
};

export default async function* listDirectoryContents(args: CommandArgs) {
  let idx = 0;
  yield <ListDirectoryContentsOutput options={{ showHidden: args.has('a') }} key={idx++} />;
}
