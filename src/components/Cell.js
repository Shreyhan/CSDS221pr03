import React from 'react';

function Cell({ row, col, isActive, isSelected, handleCellClick }) {
  return (
    <div className="test" onClick={() => handleCellClick(row, col)} style={{
        width: '65px',
        height: '65px',
        backgroundColor: isSelected ? '#d0e9f6' : (isActive ? '#9c7bff' : ''),
        border: '1px solid black',
        cursor: 'pointer'
    }}>
    </div>
  );
}

export default Cell;
