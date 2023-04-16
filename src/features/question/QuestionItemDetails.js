import {useState} from "react";
import GridColumn from "../../app/common/GridColumn";
import Grid from "../../app/common/Grid";
import GridRow from "../../app/common/GridRow";
import Panel from "../../app/common/Panel";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../app/common/RadioButton";
import Segment from "../../app/common/Segment";

function QuestionItemDetails(props) {
    const {question} = props;
    const [checkedAnswer, setCheckedAnswer] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const onModalVisibleChange = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const onAnswerChange = (choice) => {
        console.log(choice);
        setCheckedAnswer(choice);
    }

    if(!question) return null;

    const date = question.published_at ? new Date(question.published_at)?.toString() : '';
    
    return (
        <Panel 
            className="panel m-8">
            <Grid>
                    <GridColumn width={"40%"}>
                        <img 
                            className="card-image" 
                            src={question.image_url}
                        />
                    </GridColumn>
                    <GridColumn width={"50%"}>
                        <GridRow height={"15%"}>
                            <div 
                                className="list-item-header"
                            >
                                {question.question}
                                <span className="list-item-date">Published at: {date}</span>
                            </div>
                           
                        </GridRow>
                        <GridRow height={"60%"}>
                            <Segment width={"100%"} height={"auto"}><div className="answer-header">Choices:</div>
                                {question.choices.map(choice => 
                                    <div className="row">
                                        <RadioButton
                                            key={choice.choice}
                                            value={choice.choice}
                                            onChange={() => onAnswerChange(choice.choice)}
                                            checked={choice.choice === checkedAnswer}      
                                        />
                                    </div>                  
                                )}
                            </Segment>
                        </GridRow>
                    </GridColumn>
                    <button onClick={onModalVisibleChange}>Share</button>
            </Grid>
        </Panel>
    );
}

export default QuestionItemDetails;