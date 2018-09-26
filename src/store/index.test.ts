import { flush } from 'store/modules/root';
import { fetchUser } from 'store/modules/user';
import { fetchRepos } from 'store/modules/repos';
import { store } from '.';

describe('Redux Store', () => {
  it('should init with initial state', () => {
    const actual = store.getState();
    const expected = {
      user: { isLoading: false, data: null, error: null },
      repos: { isLoading: false, data: [] },
    };
    expect(actual).toEqual(expected);
  });

  it('should work with multiple actions', () => {
    const actions = [
      flush(),
      fetchUser.success({ name: 'Bohdan' }),
      fetchRepos.success([{}, {}]),
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      user: { isLoading: false, data: { name: 'Bohdan' }, error: null },
      repos: { isLoading: false, data: [{}, {}] },
    };

    expect(actual).toEqual(expected);
  });

  it('should fail loading user', () => {
    const actions = [flush(), fetchUser.failure('Not found')];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      user: { isLoading: false, data: null, error: 'Not found' },
      repos: { isLoading: false, data: [] },
    };

    expect(actual).toEqual(expected);
  });
});
