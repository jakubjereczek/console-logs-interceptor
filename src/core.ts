import { State, clearState, updateState } from './_state';

type RegisterOptions = Partial<Pick<State, 'commands' | 'maxCache'>>;

/**
 * Initialize the capture of logging messages with the indicated initial configuration.
 *
 * @param registerOptions The initial options.
 * @returns void
 */
export function register({ commands, maxCache }: RegisterOptions) {
  updateState({
    registered: true,
    commands: commands || [],
    maxCache,
  });
}

/**
 * Terminate the capture of logging messages and revert to the initial configuration.
 *
 * @returns void
 */
export function unregister() {
  clearState();
}
