import { Command, Message } from './structures';

export interface State {
  /**
   * Indicates whether logging interception is enabled.
   */
  registered: boolean;
  /**
   * Specifies the supported types of intercepted commands.
   */
  commands: Command[];
  /**
   * Stores an array of captured log messages.
   */
  messages: Message[];
  /**
   * Specifies the maximum number of intercepted logs to be stored in the cache.
   * By default, there is no limit.
   */
  maxCache?: number;
}

export const initialState: State = {
  registered: false,
  commands: [Command.Log, Command.Warn, Command.Debug, Command.Error],
  messages: [],
  maxCache: undefined,
};

export let state: State = initialState;

export function updateState(payload: Partial<State>) {
  state = {
    ...state,
    ...payload,
  };
}

export function clearState() {
  state = initialState;
}
