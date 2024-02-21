export enum Command {
  Log,
  Warn,
  Debug,
  Error,
}

export interface Message {
  command: Command;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}
