/* eslint-disable @typescript-eslint/no-explicit-any */
import { state, updateState } from './_state';
import { call } from './listeners';
import { Command, Message } from './structures';

const originalFn = {
  [Command.Log]: console.log,
  [Command.Warn]: console.warn,
  [Command.Debug]: console.debug,
  [Command.Error]: console.error,
};

export function captureConsole() {
  console.log = (...data: any[]) => {
    onMessage(Command.Log, data);
  };
  console.warn = (...data: any[]) => {
    onMessage(Command.Warn, data);
  };
  console.debug = (...data: any[]) => {
    onMessage(Command.Debug, data);
  };
  console.error = (...data: any[]) => {
    onMessage(Command.Error, data);
  };
}

export function restoreConsole() {
  console.log = originalFn[Command.Log];
  console.warn = originalFn[Command.Warn];
  console.debug = originalFn[Command.Debug];
  console.error = originalFn[Command.Error];
}

function onMessage(command: Command, data: any[]) {
  originalFn[command](...data);
  if (data[0]?.includes('#skip')) {
    return;
  }
  const message: Message = {
    command,
    payload: {
      ts: new Date().toISOString(),
      message: data,
    },
  };
  updateState({
    messages: [...state.messages, message],
  });
  call('onAll', message);
  call('onPush', message);
  call(`on${command}`, message);
}
