import React, { useState, useContext } from 'react';
import agent from "../../app/api/agent/agent";
import {ModalContext} from "../../app/store/ModalStore";

const QuestionDetails = ({ question }) => {
  const [selectedChoice, setChoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(); 
  const [state, setState] = useContext(ModalContext);

  if(!question) return null;

  const onModalVisibleChange = (contentUrl) => {
    setState({isOpen: true, contentUrl: contentUrl});
  }

  const onVoteSubmit = () => {
    setLoading(true);
    let updatedQuestion = question;
    updatedQuestion.choices.forEach(choice => {
      if(choice.choice === selectedChoice) {
        choice.votes++;
      }
    });

    agent.Questions.update(question.id, updatedQuestion).then(res => {
      setLoading(false);
    })
    .catch(error => setError('An error has occurred'))
  }

  
  const handleChoiceChange = (e) => {
    console.log(e)
    setChoice(e.target.value);
  };

  const date = question.published_at ? new Date(question.published_at)?.toString() : '';
  const contentUrl = window.location.href;
  const totalVotes = question.choices.reduce((total, choice) => total + choice.votes, 0);
  const percentageVotes = question.choices.map((choice) => (totalVotes === 0 ? 0 : (choice.votes / totalVotes) * 100));
  return (
    <div className="details-panel" style={{height:"100%"}}>
      <div className="details-panel-header">
        <img src={question.image_url} alt={question.question} />
      </div>
      <div className="details-panel-body">
        <h2>{question.question}</h2>
        <div className="details-panel-poll">
            {question.choices.map((ch, index) => {
                return <div className={'voting-poll-item-container '}>
                <div className="voting-poll-item">
                  <label key={ch.choice}>{ch.choice} {ch.votes} votes </label>
                  <input
                    type="radio"
                    value={ch.choice}
                    checked={selectedChoice === ch.choice}
                    onChange={handleChoiceChange}
                  />
                  </div>
                <div className="result-bar" style={{ width: `${percentageVotes[index]}%` }}>
                  {percentageVotes[index].toFixed(1)}%
                </div>
              </div> 
            })}
          <button disabled={selectedChoice === ''} onClick={onVoteSubmit}>Submit</button>
          <button onClick={() => onModalVisibleChange(contentUrl)}>Share</button>
        </div>
      </div>
      <div className="details-panel-footer">
          <span>{date}</span>
      </div>
    </div>
  );
};

export default QuestionDetails;