import {useState, useContext} from "react";
import Panel from "../../app/common/Panel";
import { useNavigate } from "react-router-dom";
import { ModalProvider, ModalContext } from "../../app/store/ModalStore";

function QuestionListItem(props) {
    const {question} = props;
    const navigate = useNavigate();

    const [state, setState] = useContext(ModalContext);

    const onModalVisibleChange = (contentUrl) => {
        setState({isOpen: true, contentUrl: contentUrl});
    }

    const date = new Date(question.published_at)?.toString();
    const contentUrl = window.location.href + '/' + question.id.toString();

    return (
        <Panel key={"question-" + question.id} className="panel m-8">
            <div className="list-item">
                <img 
                    className="list-item-thumb" 
                    src={question.thumb_url}
                />
                <div className="list-item-content">
                    <a 
                        className="list-item-header"
                        onClick={() => navigate(`/questions/${question.id}`)}
                    >
                        {question.question}
                    </a>
                    <div className="list-item-date">Published at: {date}</div>
                </div>
                <button onClick={() => onModalVisibleChange(contentUrl)}>Share</button>
            </div>
        </Panel>
    );
}

export default QuestionListItem;