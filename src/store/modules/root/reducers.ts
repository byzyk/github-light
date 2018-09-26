import { combineReducers } from 'redux';
import { userReducer as user, IUserState } from 'store/modules/user';
import { reposReducer as repos, IReposState } from 'store/modules/repos';

export interface IRootState {
  user: IUserState;
  repos: IReposState;
}

export const rootReducer = combineReducers<IRootState>({ user, repos });
