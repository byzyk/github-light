import React from 'react';
import { render } from 'react-testing-library';
import Loading from '.';

describe('Loading', () => {
  it('renders without crashing', () => {
    render(<Loading loading={true} />);
  });

  it('shows spinner when loading active', () => {
    const { container } = render(<Loading loading={true} />);
    expect(container.querySelector('.ant-spin')).toBeVisible();
  });

  it('hides spinner when loading inactive', () => {
    const { container } = render(<Loading loading={false} />);
    expect(container.querySelector('.ant-spin')).toBeNull();
  });
});
