import React from 'react';
import Cell from './Cell';

function Grid({ size, handleCellClick, sequence, showSequence, playerSequence }) {
  const renderGrid = () => {
    let grid = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const isActive = showSequence && sequence.some(item => item.row === row && item.col === col);
        const isSelected = playerSequence.some(item => item.row === row && item.col === col);
        grid.push(<Cell key={`${row}-${col}`} row={row} col={col} isActive={isActive} isSelected={isSelected} handleCellClick={handleCellClick} />);
      }
    }
    return grid;
  };

  return (
    <div className="grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 65px)`, gridGap: '0px' }}>
      {renderGrid()}
    </div>
  );
}

export default Grid;
