import { flush } from 'store/modules/root';
import { userReducer, initState } from './reducers';
import { fetchUser } from './actions';

const stateMock = {
  login: 'byzyk',
  avatar_url: 'https://avatars2.githubusercontent.com/u/1867692?v=4',
  html_url: 'https://github.com/byzyk',
  name: 'Bohdan Khodakivskyi',
  location: 'Kiev, Ukraine | Live in Dubai',
  followers: 22,
  following: 3,
};

describe('Redux userReducer', () => {
  it('should save user data', () => {
    const actual = userReducer(initState, fetchUser.success(stateMock));
    const expected = {
      isLoading: false,
      error: null,
      data: stateMock,
    };
    expect(actual).toEqual(expected);
  });

  it('should flush', () => {
    const actual = userReducer(
      {
        isLoading: false,
        error: null,
        data: stateMock,
      },
      flush(),
    );
    const expected = {
      isLoading: false,
      error: null,
      data: null,
    };
    expect(actual).toEqual(expected);
  });

  it('should switch to loading state after fetching', () => {
    const actual = userReducer(
      {
        isLoading: false,
        error: null,
        data: null,
      },
      fetchUser.request('blabla'),
    );
    const expected = {
      isLoading: true,
      error: null,
      data: null,
    };
    expect(actual).toEqual(expected);
  });

  it('should mark as error when no user found', () => {
    const actual = userReducer(
      {
        isLoading: true,
        error: null,
        data: null,
      },
      fetchUser.failure('Not found'),
    );
    const expected = {
      isLoading: false,
      error: 'Not found',
      data: null,
    };
    expect(actual).toEqual(expected);
  });
});
