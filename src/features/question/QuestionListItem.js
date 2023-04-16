import {useState} from "react";
import Panel from "../../app/common/Panel";
import { useNavigate } from "react-router-dom";

function QuestionListItem(props) {
    const {question} = props;
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onModalVisibleChange = () => {
        setIsOpenModal(!isOpenModal);
    }

    const date = new Date(question.published_at)?.toString();

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
                <button onClick={onModalVisibleChange}>Share</button>
            </div>
        </Panel>
    );
}

export default QuestionListItem;