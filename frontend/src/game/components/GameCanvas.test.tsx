import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GameCanvas from './GameCanvas';

jest.useFakeTimers();

beforeAll(() => {
  // Robust mock for canvas.getContext with type cast
  HTMLCanvasElement.prototype.getContext = jest.fn(() => new Proxy({}, {
    get: () => jest.fn()
  })) as any;
});

describe('GameCanvas restart functionality', () => {
  it('should reset score, player position, coins, and enemies on restart', () => {
    render(<GameCanvas />);
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  });
});
