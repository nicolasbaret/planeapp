// Polyfill TextEncoder for JSDOM
import { TextEncoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

import { render } from '@testing-library/react';
import Layout from './Layout';
import '@testing-library/jest-dom';

describe('Layout', () => {
  it('renders app bar and container', () => {
    const { getByText } = render(<Layout />);
    expect(getByText(/PlaneApp/i)).toBeInTheDocument();
  });
});
