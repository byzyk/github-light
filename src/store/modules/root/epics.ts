import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from 'store/modules/user';
import { fetchReposEpic } from 'store/modules/repos';

export const rootEpic = combineEpics(fetchUserEpic, fetchReposEpic);
