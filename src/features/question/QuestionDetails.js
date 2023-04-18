import React, { useContext } from 'react';
import {ModalContext} from "../../app/stores/ModalStore";
import VotingPoll from '../../app/common/VotingPoll';
import Loader from '../../app/layout/Loader';

const QuestionDetails = ({ question, handleChoiceChange, selectedChoice, submitting, onVoteSubmit, message }) => { 
  const [state, setState] = useContext(ModalContext);

  if(!question) return null;

  const onModalVisibleChange = (contentUrl) => {
    setState({isOpen: true, contentUrl: contentUrl});
  }

  const date = question.published_at ? new Date(question.published_at)?.toString().split('+')[0] : 'N/A';
  const contentUrl = window.location.href;

  return (
    <div className="details-panel" style={{height:"100%"}}>
      <div className="details-panel-header">
        <img src={question.image_url} alt={question.question} />
      </div>
      <div className="details-panel-body">
        <h2>{question.question}</h2>
        {submitting ? <div className='loader-container-xs'><Loader/></div> :
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
          <div className="list-item-date">Published at: {date}</div>
      </div>
    </div>
  );
};

export default QuestionDetails;