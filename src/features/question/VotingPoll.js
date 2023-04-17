import React from 'react';

function VotingPoll({ choices, selectedChoice, handleChoiceChange }) {
    
    if(!choices) return null;
    const totalVotes = choices.reduce((total, choice) => total + choice.votes, 0);
    const percentageVotes = choices.map((choice) => (totalVotes === 0 ? 0 : (choice.votes / totalVotes) * 100));
    console.log(choices, totalVotes, percentageVotes);
    return (
        <div className="voting-poll">
        <div className="choices-container">
        {choices.map((choice, index) => (
                <div key={index} className="choice">
                    <input
                        type="radio"
                        id={`choice-${index}`}
                        name="choice"
                        value={choice.choice}
                        checked={selectedChoice === choice.choice}
                        onChange={handleChoiceChange(choice.choice)}
                    />
                    <label htmlFor={`choice-${index}`}>{choice.choice}</label>
                </div>
        ))}
        </div>
        <div className="results-container">
            {choices.map((choice, index) => (
            <div key={index} className="result">
                <div className="result-bar" style={{ width: `${percentageVotes[index]}%` }}>
                {percentageVotes[index].toFixed(1)}%
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default VotingPoll;