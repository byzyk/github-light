import { Dispatch as ReduxDispatch, Reducer as ReduxReducer } from 'redux';
import { IRootState, IRootAction } from 'store/modules/root';

export type Dispatch = ReduxDispatch<IRootAction>;
export type Reducer = ReduxReducer<IRootState>;

export interface IDispatchProp {
  dispatch: Dispatch;
}
