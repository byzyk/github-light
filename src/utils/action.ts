export interface IAction {
  type: string;
  payload?: any;
  error?: boolean;
}

export type ActionResolver = (payload?: any) => IAction;

export interface IAsyncAction {
  request: ActionResolver;
  success: ActionResolver;
  failure: ActionResolver;
}

const actionCreator = (
  name: string,
  type: string = '',
  isError: boolean = false,
): any => {
  const actionType = type.length ? `${name}_${type}` : name;
  const action: IAction = {
    type: actionType,
  };

  if (isError) {
    action.error = true;
  }

  return (payload?: any): IAction => {
    if (payload) {
      action.payload = payload;
    }

    return action;
  };
};

export const createAction = (name: string): ActionResolver => {
  return actionCreator(name);
};

export const createActionAsync = (name: string): IAsyncAction => {
  return {
    request: actionCreator(name, 'REQUEST'),
    success: actionCreator(name, 'SUCCESS'),
    failure: actionCreator(name, 'FAILURE', true),
  };
};
