import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Grid from './components/Grid';
import RulesModal from './components/RulesModal';
import FailModal from './components/FailModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

let gridSize = 5;

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [showSequence, setShowSequence] = useState(true); 
  const [showRules, setShowRules] = useState(true);
  const [highScore, setHighScore] = useState(0); // State for high score
  const [lives, setLives] = useState(2); // State for lives
  const [showFailModal, setShowFailModal] = useState(false);
  
  const closeRuleModal = () => {
    // Resets it so there is a new board when they start
    setCurrentLevel(0);
    setShowRules(false);
  };


  const closeFailModal = () => {
    setLives(2);
    setCurrentLevel(0);
    setShowFailModal(false); 
    setShowRules(true);
  };

  useEffect(() => {

    // ensures no negative levels
    if (currentLevel < 1) {
      setCurrentLevel(1);
    }

    if (currentLevel > highScore) {
      setHighScore(currentLevel-1);
    }
    
    gridSize = 5 + Math.floor((currentLevel/5));
    const newSequence = generateSequence(currentLevel + Math.floor(gridSize/2));
    setSequence(newSequence);
    setPlayerSequence([]);
    setShowSequence(true);
    setTimeout(() => {
      setShowSequence(false);
    }, 3000); // Show sequence for 3 seconds
  }, [currentLevel]);

  

  const generateSequence = (length) => {
    let newSequence = [];
    while (newSequence.length < length) {
      const newCell = {
        row: Math.floor(Math.random() * gridSize),
        col: Math.floor(Math.random() * gridSize)
      };
      if (!newSequence.some(item => item.row === newCell.row && item.col === newCell.col)) {
        newSequence.push(newCell);
      }
    }
    return newSequence;
  };

  const handleCellClick = (row, col) => {
    if (showSequence) {
      // Ignore clicks while sequence is shown
      return;
    }

    setPlayerSequence(prev => {
      const existingIndex = prev.findIndex(item => item.row === row && item.col === col);
      if (existingIndex > -1) {
        return [...prev.slice(0, existingIndex), ...prev.slice(existingIndex + 1)];
      }
      const newSequence = [...prev, { row, col }];
      if (newSequence.length === sequence.length) {
        setTimeout(() => {
          //needs timeout to make the cell red after last click too instead of instantly moving on
          checkSequenceDirectly(newSequence);
        }, 100);
      }
      return newSequence;
    });
  };


  
  const checkSequenceDirectly = (currentPlayerSequence) => {
    // Create a function to convert sequences into a string count map
    const createCountMap = (seq) => {
      const countMap = {};
      seq.forEach(cell => {
        const key = `${cell.row}-${cell.col}`;
        if (countMap[key]) {
          countMap[key]++;
        } else {
          countMap[key] = 1;
        }
      });
      return countMap;
    };
  
    const sequenceCountMap = createCountMap(sequence);
    const playerSequenceCountMap = createCountMap(currentPlayerSequence);
  
    const isCorrect = Object.keys(sequenceCountMap).every(key => {
      return sequenceCountMap[key] === playerSequenceCountMap[key];
    });
  
    if (isCorrect) {
      toastr.success('Correct sequence! Moving to the next level.');
      if ((currentLevel+1) % 5 === 0) {
        toastr.info(`WOO level ${currentLevel+1}! Gride size increase!`);
      }
      setCurrentLevel(currentLevel + 1);
    } else {
      if (lives > 1) {
        toastr.error(`FAIL! Life used! ${lives - 1} lives left! Level reset to last checkpoint!`);
        setLives(lives-1);
        setPlayerSequence([]);
        setShowSequence(true);
        setTimeout(() => {
          setShowSequence(false);
        }, 3000);
      } else {
        toastr.error(`No lives left!!!! game over!`);
        setShowFailModal(true);
      }
    }
  };
  
  
  

  return (
    <div className="app">
      {showRules && <RulesModal showModal={showRules} closeModal={closeRuleModal} />}
      {showFailModal && <FailModal showModal={showFailModal} closeModal={closeFailModal} level={currentLevel} highScore={highScore} />}
      <h1 className='title'>Memory Grid Game!</h1>
      <h1 className='levelLabel'>Level {currentLevel}</h1>
      <Grid size={gridSize} handleCellClick={handleCellClick} sequence={sequence} showSequence={showSequence} playerSequence={playerSequence} />
      <h2 className='lives'>Lives Left: {lives}</h2>
      <h2 className='highScore'>High Score: {highScore}</h2>
    </div>
  );
}

export default App;
