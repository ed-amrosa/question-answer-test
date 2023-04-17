import React, { useState, useContext } from 'react';
import agent from "../../app/api/agent/agent";
import {ModalContext} from "../../app/store/ModalStore";
import VotingPoll from './VotingPoll';
import Loader from '../../app/layout/Loader';
import { useNavigate } from 'react-router-dom';

const QuestionDetails = ({ question }) => {
  const {navigate} = useNavigate()
  const [selectedChoice, setChoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessasge] = useState(''); 
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
      setMessasge('Vote submitted successfully');
    })
    .catch(error => {
      setLoading(false);
      setMessasge('An error ha ocurred, vote submition failed');
    })
  }

  const handleChoiceChange = (choice) => {
    setChoice(choice);
  };

  const date = question.published_at ? new Date(question.published_at)?.toString() : '';
  const contentUrl = window.location.href;

  return (
    <div className="details-panel" style={{height:"100%"}}>
      <div className="details-panel-header">
        <img src={question.image_url} alt={question.question} />
      </div>
      <div className="details-panel-body">
        <h2>{question.question}</h2>
        {loading ? <div className='loader-container-xs'><Loader/></div> :
          <>
            <VotingPoll
              choices={question.choices}
              handleChoiceChange={handleChoiceChange}
              selectedChoice={selectedChoice}
            />
            {message && <div>{message}</div>}
            <button disabled={selectedChoice === ''} onClick={onVoteSubmit}>Submit</button>
            <button onClick={() => onModalVisibleChange(contentUrl)}>Share</button>
          </>
        }
      </div>
      <div className="details-panel-footer">
          <div className="list-item-date">Published at: {date ? date.split('+')[0] : 'N/A'}</div>
      </div>
    </div>
  );
};

export default QuestionDetails;