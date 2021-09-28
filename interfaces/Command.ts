export interface Command {
  args: Array<Argument>;

  run(): void;
}
