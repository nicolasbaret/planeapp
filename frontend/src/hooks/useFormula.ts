import type { GridType } from './useSheetGrid';

// Helper to convert column index to letter (A, B, C...)
export const colToLetter = (col: number) => String.fromCharCode(65 + col);
export const letterToCol = (letter: string) => letter.charCodeAt(0) - 65;

// Basic formula parser (supports =A1+B2, =A1-B2, =A1*B2, =A1/B2)
export function evaluateFormula(formula: string, grid: GridType): string | number {
  try {
    const match = formula.match(/^=([A-Z])(\d+)([+\-*/])([A-Z])(\d+)$/);
    if (!match) return formula;
    const [, col1, row1, op, col2, row2] = match;
    const val1 = parseFloat(grid[parseInt(row1) - 1][letterToCol(col1)] || '0');
    const val2 = parseFloat(grid[parseInt(row2) - 1][letterToCol(col2)] || '0');
    switch (op) {
      case '+': return val1 + val2;
      case '-': return val1 - val2;
      case '*': return val1 * val2;
      case '/': return val2 !== 0 ? val1 / val2 : 'Err';
      default: return formula;
    }
  } catch {
    return 'Err';
  }
}
