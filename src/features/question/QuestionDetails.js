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
    setChoice(e.target.value);
  };

  const date = question.published_at ? new Date(question.published_at)?.toString() : '';
  const contentUrl = window.location.href;

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