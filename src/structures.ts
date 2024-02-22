export enum Command {
  Log = 'Log',
  Warn = 'Warn',
  Debug = 'Debug',
  Error = 'Error',
}

export interface Message {
  command: Command;
  payload: {
    // timestamp
    ts: string;
    // message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message: any;
  };
}
