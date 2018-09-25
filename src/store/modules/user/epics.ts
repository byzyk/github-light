import { Epic } from 'redux-observable';
import http from 'utils/http';
import { IRootState, IRootAction } from 'store/modules/root';
import { fetchUser } from './';
import { fetchRepos } from 'store/modules/repos';

const { REACT_APP_API } = process.env;

export const fetchUserEpic: Epic<IRootAction, IRootState> = action$ =>
  action$.ofType(fetchUser.request().type).switchMap(action =>
    http({
      method: 'GET',
      api: REACT_APP_API,
      path: `/users/${action.payload}`,
    })
      .switchMap((response: any) => [
        fetchUser.success(response),
        fetchRepos.request(action.payload),
      ])
      .catch((error: any) => [fetchUser.failure(error.message)]),
  );
