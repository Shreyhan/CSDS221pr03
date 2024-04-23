import React, { useState, useEffect } from 'react';

const RulesModal = ({ showModal, closeModal }) => {

    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" id="ruleHead">
                        <h5 className="modal-title">Game Rules</h5>
                    </div>
                    <div className="modal-body panel-body">
                        <p>Welcome to the Memory Grid Game! Here's how to play:</p>
                        <ul>
                            <li>Memorize the purple cells that appear on the grid.</li>
                            <li>Once they disappear, click the cells that were shown.</li>
                            <li>Correctly replicate the sequence to move to the next level.</li>
                            <li>Each 5 levels, the grid size will slightly increase.</li>
                            <li>If you make a mistake, you will lose a life and must retry the level.</li>
                            <li>If you run out of lives, the game is over.</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={closeModal}>Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RulesModal;
