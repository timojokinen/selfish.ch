import { removeTrailingSlash } from './util';

export interface FSNode {
  name: string;
}

export class Directory implements FSNode {
  public name: string;
  public contents: Array<FSNode>;

  constructor(name: string, contents: Array<FSNode>) {
    this.name = name;
    this.contents = contents;
  }
}

export class File implements FSNode {
  public name: string;
  public contents: string;

  constructor(name: string, contents: string) {
    this.name = name;
    this.contents = contents;
  }
}

class FS {
  private root: Directory;
  private dirCache = new Map<string, FSNode>();

  constructor(root: Directory) {
    this.root = root;
    this.dirCache = this.buildDirCache();
  }

  public readdir = (path: string): FSNode[] => {
    const node = this.dirCache.get(removeTrailingSlash(path));
    if (!node) {
      throw new Error(path + ': No such file or directory.');
    }

    if (node instanceof Directory) {
      return node.contents;
    } else {
      return [node];
    }
  };

  public exists = (path: string): FSNode | false => {
    return this.dirCache.get(removeTrailingSlash(path)) ?? false;
  };

  private buildDirCache() {
    const dirCache = new Map<string, FSNode>();

    const mapDir = (directory: Directory, path = '/home') => {
      dirCache.set(path, directory);
      for (const node of directory.contents) {
        if (node instanceof File) {
          dirCache.set(`${path}/${node.name}`, node);
        } else if (node instanceof Directory) {
          mapDir(node, `${path}/${node.name}`);
        }
      }
    };

    mapDir(this.root);
    return dirCache;
  }
}

export default new FS(
  new Directory('home', [
    new Directory('selfish', [
      new File('.zshrc', 'EXPORT PATH=test'),
      new File('larrybird.sh', 'Larry Bird'),
      new Directory('Repositories', [new File('larrybird.sh', 'Larry Bird')]),
    ]),
  ]),
);
