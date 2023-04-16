import React, { useState } from 'react';
import agent from "../../app/api/agent/agent";

const QuestionDetails = ({ question }) => {
  const [selectedChoice, setChoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(); 
  const [isOpenModal, setIsOpenModal] = useState(false);

  if(!question) return null;

  const onModalVisibleChange = () => {
    setIsOpenModal(!isOpenModal);
  }

  const onVoteSubmit = () => {
    console.log("YO")
    setLoading(true);
    agent.Questions.update(question.id).then(res => {
      setLoading(false);
    })
    .catch(error => setError('An error has occurred'))
  }

  
  const handleChoiceChange = (e) => {
    setChoice(e.target.value);
  };

  const date = question.published_at ? new Date(question.published_at)?.toString() : '';

  return (
    <div className="details-panel">
      <div className="details-panel-header">
        <img src={question.image_url} alt={question.question} />
      </div>
      <div className="details-panel-body">
        <h2>{question.question}</h2>
        <div className="details-panel-poll">
          <h3>Choices:</h3>
          <form>
            {question.choices.map(ch => {
                return <label key={ch.choice}>
                    <input
                        type="radio"
                        value={ch.choice}
                        checked={selectedChoice === ch.choice}
                        onChange={handleChoiceChange}
                    />
                {ch.choice}
                <span> ({ch.votes} votes) </span>
              </label>
            })}
          </form>
          <button disabled={selectedChoice === ''} onClick={onVoteSubmit}>Submit</button>
          <button onClick={onModalVisibleChange}>Share</button>
        </div>
      </div>
      <div className="details-panel-footer">
          <span>{date}</span>
      </div>
    </div>
  );
};

export default QuestionDetails;