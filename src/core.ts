import { captureConsole, restoreConsole } from './_capture';
import { State, clearState, updateState } from './_state';

type RegisterOptions = Partial<Pick<State, 'maxCache'>>;

/**
 * Initialize the capture of logging messages with the indicated initial configuration.
 *
 * @param registerOptions The initial options.
 * @returns void
 */
export function register({ maxCache }: RegisterOptions = {}) {
  updateState({
    registered: true,
    maxCache,
  });
  captureConsole();
}

/**
 * Terminate the capture of logging messages and revert to the initial configuration.
 *
 * @returns void
 */
export function unregister() {
  clearState();
  restoreConsole();
}
