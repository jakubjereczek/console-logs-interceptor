export enum Command {
  Log = 'Log',
  Warn = 'Warn',
  Debug = 'Debug',
  Error = 'Error',
}

export interface Message {
  command: Command;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}
