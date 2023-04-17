import React from 'react';
/*
props - choices: [{coice, votes}]
      - selectedChoice: string
      - handleChoiceChange: anon func () => {};
*/

function VotingPoll({ choices, selectedChoice, handleChoiceChange }) {
    
    if(!choices) return null;
    const totalVotes = choices.reduce((total, choice) => total + choice.votes, 0);
    const percentageVotes = choices.map((choice) => (totalVotes === 0 ? 0 : (choice.votes / totalVotes) * 100));

    return (<div className="details-panel-poll">
    {
        choices.map((ch, index) => {
            return <div className='voting-poll-item-container ' style={{backgroundColor: selectedChoice === ch.choice ? '#18bb4c' : '#d0e1f2'}} onClick={() => handleChoiceChange(ch.choice)}>
                <div className="voting-poll-item">
                <label key={ch.choice}>{ch.choice} ({ch.votes}) votes </label>
                </div>
                <div className="result-bar" style={{ width: `${percentageVotes[index]}%` }}>
                {percentageVotes[index].toFixed(1)}%
                </div>
            </div> 
        })
    }
    </div>
    );
}

export default VotingPoll;