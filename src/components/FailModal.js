import React from 'react';

const FailModal = ({ showModal, closeModal, level, highScore }) => {
    const win = level-1 > highScore;
    const same = level-1 === highScore;
    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" id="failHead">
                        <h5 className="modal-title">GAME OVER!</h5>
                    </div>
                    <div className="modal-body panel-body">
                        <p>You beat level {level-1}</p>
                        <p>Your high score is {highScore}</p>
                        {same ? (
                            <p>You didn't beat your highscore but atleast you hit it!</p>
                        ) : (
                            win ? (
                                <p>Congratulations! You've set a new high score!</p>
                            ) : (
                                <p>You suck, you didn't even beat your high score!</p>
                            )
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={closeModal}>Restart Game</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FailModal;
