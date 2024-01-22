import { store } from './store';
import { describe, test, expect } from 'vitest';

describe('store', () => {
  test('the shape of the state', () => {
    const state = store.getState();
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('simulator');
    expect(state).toHaveProperty('blockly');
  });
});
