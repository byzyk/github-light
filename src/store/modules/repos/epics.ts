import { Epic } from 'redux-observable';
import http from 'utils/http';
import { IRootState, IRootAction } from 'store/modules/root';
import { fetchRepos } from './';

const { REACT_APP_API } = process.env;

export const fetchReposEpic: Epic<IRootAction, IRootState> = action$ =>
  action$.ofType(fetchRepos.request().type).switchMap(action =>
    http({
      method: 'GET',
      api: REACT_APP_API,
      path: `/users/${action.payload}/repos`,
    })
      .map((response: any) => fetchRepos.success(response))
      .catch((error: any) => [fetchRepos.failure(error)]),
  );
