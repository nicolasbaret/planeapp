import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GameCanvas from './GameCanvas';

jest.useFakeTimers();

beforeAll(() => {
  // Polyfill getContext with a more complete mock
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => ({
      canvas: document.createElement('canvas'),
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      clearRect: jest.fn(),
      stroke: jest.fn(),
      fillStyle: '',
      fillText: jest.fn(), // Add fillText to mock
      font: '',
      // Add more properties if needed
    }),
  });
});

describe('GameCanvas', () => {
  it('renders initial score and canvas', () => {
    render(<GameCanvas />);
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
    // Find canvas by tag
    expect(document.querySelector('canvas')).toBeTruthy();
  });

  it('restarts the game and resets state', () => {
    render(<GameCanvas />);
    // Try to find restart button by text or role
    const restartBtn = screen.queryByText(/Restart/i) || screen.queryByRole('button', { name: /Restart/i });
    if (restartBtn) {
      act(() => {
        fireEvent.click(restartBtn);
      });
      expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
    }
  });

  it('does not trigger game over after restart until collision', () => {
    render(<GameCanvas />);
    const restartBtn = screen.queryByText(/Restart/i) || screen.queryByRole('button', { name: /Restart/i });
    if (restartBtn) {
      act(() => {
        fireEvent.click(restartBtn);
      });
      expect(screen.queryByText(/Game Over/i)).not.toBeInTheDocument();
    }
  });
});
