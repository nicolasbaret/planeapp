import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../services/api', () => ({
  get: jest.fn(() => Promise.resolve({ data: { status: 'healthy' } }))
}));

const queryClient = new QueryClient();

describe('Home', () => {
  it('renders title and game demo', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    expect(screen.getByText(/PLANEAPP/i)).toBeInTheDocument();
    expect(screen.getByText(/Game Demo:/i)).toBeInTheDocument();
  });

  it('shows backend status when loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    expect(await screen.findByText(/Backend status: healthy/i)).toBeInTheDocument();
  });
});
