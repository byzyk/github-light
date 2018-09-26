import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { rootReducer } from 'store/modules/root';

export const renderWithRedux = (
  component: React.ReactNode,
  store = createStore(rootReducer, {}),
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
