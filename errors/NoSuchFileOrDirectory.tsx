export class NoSuchFileOrDirectory extends Error {
  constructor(path: string) {
    super(path + ': No such file or directory');
  }
}
