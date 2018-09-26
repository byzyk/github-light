import React from 'react';
import { renderWithRedux } from 'utils/test-helpers';
import UserSearch from '.';

describe('UserSearch', () => {
  it('renders without crashing', () => {
    renderWithRedux(<UserSearch />);
  });

  it('matches snapshot', () => {
    const { container } = renderWithRedux(<UserSearch />);
    expect(container).toMatchSnapshot();
  });

  it('search field to be visible', () => {
    const { getByPlaceholderText } = renderWithRedux(<UserSearch />);
    const input = getByPlaceholderText('Search by name');
    expect(input).toBeVisible();
  });
});
