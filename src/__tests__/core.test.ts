import { Command, register, unregister } from '../index';
import { clearState, updateState } from '../_state';

jest.mock('../_state', () => {
  return {
    clearState: jest.fn(),
    updateState: jest.fn(),
  };
});

describe('core tests', () => {
  it('register: should update state with initial provided configuration', () => {
    const config = {
      commands: [Command.Warn, Command.Error],
      maxCache: 500,
    };
    register(config);

    expect(updateState).toHaveBeenCalledWith({ registered: true, ...config });
  });

  it('unregister: should clear state', () => {
    unregister();

    expect(clearState).toHaveBeenCalled();
  });
});
