import React from 'react';
import { renderWithRedux } from 'utils/test-helpers';
import App from '.';

describe('App', () => {
  it('renders without crashing', () => {
    renderWithRedux(<App />);
  });

  it('has greeting', () => {
    const { container } = renderWithRedux(<App />);
    expect(container).toHaveTextContent('Hello there!');
  });

  it('has author', () => {
    const { container } = renderWithRedux(<App />);
    expect(container).toHaveTextContent('Bohdan Khodakivskyi');
  });
});
