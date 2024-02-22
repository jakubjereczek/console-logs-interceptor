import { register, unregister } from '../index';
import { clearState, updateState } from '../_state';
import { captureConsole, restoreConsole } from '../_capture';

jest.mock('../_state', () => {
  return {
    clearState: jest.fn(),
    updateState: jest.fn(),
  };
});

jest.mock('../_capture', () => {
  return {
    captureConsole: jest.fn(),
    restoreConsole: jest.fn(),
  };
});

describe('core tests', () => {
  it('register: should update state with initial provided configuration', () => {
    const config = {
      maxCache: 500,
    };
    register(config);

    expect(updateState).toHaveBeenCalledWith({ registered: true, ...config });
    expect(captureConsole).toHaveBeenCalled();
  });

  it('unregister: should clear state', () => {
    unregister();

    expect(clearState).toHaveBeenCalled();
    expect(restoreConsole).toHaveBeenCalled();
  });
});
