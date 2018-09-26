import { IAction } from 'utils/action';
import { flush } from 'store/modules/root';
import { fetchUser, IUser } from '.';

export interface IUserState {
  readonly isLoading: boolean;
  readonly data: IUser | null;
  readonly error: string | null;
}

export const initState = { isLoading: false, data: null, error: null };

export const userReducer = (state: IUserState = initState, action: IAction) => {
  switch (action.type) {
    case fetchUser.request().type:
      return { ...state, isLoading: true, error: null };

    case fetchUser.success().type:
      return { ...state, isLoading: false, data: action.payload, error: null };

    case fetchUser.failure().type:
      return { ...state, isLoading: false, data: null, error: action.payload };

    case flush().type:
      return { isLoading: false, data: null, error: null };

    default:
      return state;
  }
};
