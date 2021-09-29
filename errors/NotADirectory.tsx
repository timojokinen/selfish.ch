export class NotADirectory extends Error {
  constructor(path: string) {
    super(path + ': Not a directory');
  }
}
