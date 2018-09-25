import { IAction } from 'utils/action';
import { flush } from 'store/modules/root';
import { fetchRepos, IRepo } from '.';

export interface IReposState {
  readonly isLoading: boolean;
  readonly data: IRepo[];
}

export const reposReducer = (
  state: IReposState = { isLoading: false, data: [] },
  action: IAction,
) => {
  switch (action.type) {
    case fetchRepos.request().type:
      return { ...state, isLoading: true };

    case fetchRepos.success().type:
      return { ...state, isLoading: false, data: action.payload };

    case fetchRepos.failure().type:
      return { ...state, isLoading: false, data: [] };

    case flush().type:
      return { isLoading: false, data: [] };

    default:
      return state;
  }
};
