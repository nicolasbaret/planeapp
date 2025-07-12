import { useState } from 'react';

export const ROWS = 10;
export const COLS = 6;

export type GridType = string[][];
export type CellPos = { row: number; col: number };

export function useSheetGrid(initialRows = ROWS, initialCols = COLS) {
  const [grid, setGrid] = useState<GridType>(
    Array.from({ length: initialRows }, () => Array(initialCols).fill(''))
  );
  const [selected, setSelected] = useState<CellPos | null>(null);

  const updateCell = (row: number, col: number, value: string) => {
    const newGrid = grid.map(arr => [...arr]);
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  return { grid, setGrid, selected, setSelected, updateCell };
}
