import React, { useState, useRef } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  InputBase,
} from '@mui/material';
import { useSheetGrid, ROWS, COLS } from '../hooks/useSheetGrid';
import { colToLetter, evaluateFormula } from '../hooks/useFormula';

const sheetStyles = {
  table: {
    borderCollapse: 'collapse',
    minWidth: 600,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  th: {
    background: '#f3f6fb',
    fontWeight: 600,
    border: '1px solid #e0e3e7',
    textAlign: 'center',
    padding: '8px 0',
  },
  td: {
    border: '1px solid #e0e3e7',
    padding: 0,
    minWidth: 60,
    height: 36,
    position: 'relative',
    background: '#fff',
  },
  selected: {
    outline: '2px solid #1976d2',
    zIndex: 1,
  },
  formulaBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#f3f6fb',
    border: '1px solid #e0e3e7',
    padding: '6px 12px',
    marginBottom: 8,
    borderRadius: 4,
  },
  formulaInput: {
    flex: 1,
    fontSize: 16,
    background: '#fff',
    border: 'none',
    outline: 'none',
    padding: '4px 8px',
  },
};

const Home: React.FC = () => {
  const { grid, selected, setSelected, updateCell } = useSheetGrid();
  const formulaBarRef = useRef<HTMLInputElement>(null);

  // Get formula/value for selected cell
  const formulaValue = selected ? grid[selected.row][selected.col] : '';

  // Handle formula bar change
  const handleFormulaBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selected) updateCell(selected.row, selected.col, e.target.value);
  };

  // Handle formula bar Enter (evaluate and store result)
  const handleFormulaBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selected) {
      const value = grid[selected.row][selected.col];
      if (value.startsWith('=')) {
        const result = evaluateFormula(value, grid);
        updateCell(selected.row, selected.col, String(result));
      }
    }
  };

  // Handle cell change (on Enter, evaluate formula)
  const handleCellKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e.key === 'Enter') {
      const value = grid[row][col];
      if (value.startsWith('=')) {
        const result = evaluateFormula(value, grid);
        updateCell(row, col, String(result));
      }
      setSelected({ row: Math.min(row + 1, ROWS - 1), col });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Sheet Demo
      </Typography>
      {/* Formula Bar */}
      <Box sx={sheetStyles.formulaBar}>
        <Typography variant="body2" sx={{ mr: 2, minWidth: 60 }}>
          {selected ? `${colToLetter(selected.col)}${selected.row + 1}` : ''}
        </Typography>
        <InputBase
          inputRef={formulaBarRef}
          value={formulaValue}
          onChange={handleFormulaBarChange}
          onKeyDown={handleFormulaBarKeyDown}
          sx={sheetStyles.formulaInput}
          placeholder="Enter value or formula (e.g. =A1+B2)"
          disabled={!selected}
        />
      </Box>
      {/* Sheet Table */}
      <TableContainer component={Paper}>
        <Table sx={sheetStyles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={sheetStyles.th} />
              {[...Array(COLS)].map((_, col) => (
                <TableCell key={col} sx={sheetStyles.th}>
                  {colToLetter(col)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(ROWS)].map((_, row) => (
              <TableRow key={row}>
                <TableCell sx={sheetStyles.th}>{row + 1}</TableCell>
                {[...Array(COLS)].map((_, col) => {
                  const isSelected = selected?.row === row && selected?.col === col;
                  return (
                    <TableCell
                      key={col}
                      sx={{ ...sheetStyles.td, ...(isSelected ? sheetStyles.selected : {}) }}
                      onClick={() => setSelected({ row, col })}
                    >
                      <TextField
                        variant="standard"
                        value={grid[row][col]}
                        onChange={e => updateCell(row, col, e.target.value)}
                        onFocus={() => setSelected({ row, col })}
                        onKeyDown={e => handleCellKeyDown(e as React.KeyboardEvent<HTMLInputElement>, row, col)}
                        inputProps={{ style: { width: 60, padding: 4, fontSize: 16, background: 'transparent', border: 'none' } }}
                        sx={{ width: '100%' }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" mt={2}>
        Enter numbers or formulas (e.g., <b>=A1+B2</b>) in cells. Use the formula bar for editing.
      </Typography>
    </Box>
  );
};

export default Home;
