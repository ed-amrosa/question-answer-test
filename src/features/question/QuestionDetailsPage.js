import React, {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import QuestionDetails from "./QuestionDetails";
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../app/layout/Loading";
import FixedButton from "../../app/common/FixedButton";
import { useStore } from "../stores/store";


export default observer(function QuestionDetailsPage() {
    //Using MOBX question store to remove alot of the logic from the components
    const {questionStore} = useStore();
    const {loadQuestion , loadingDetails, question, submitting, message, editQuestion} = questionStore;
    const [selectedChoice, setChoice] = useState('');
    const {questionId} = useParams();
    const navigate = useNavigate();

    const handleChoiceChange = (choice) => {
        setChoice(choice);
      };
   
    const onVoteSubmit = () => {
        let updatedQuestion = question;
        updatedQuestion.choices.forEach(choice => {
          if(choice.choice === selectedChoice) {
            choice.votes++;
          }
        });
        editQuestion(question.id, updatedQuestion);
    }
    
    useEffect(() => {
        loadQuestion(questionId);
    },[questionId]);
    
    return (
        loadingDetails ? <Loading/> : 
            <div className="mock-container">
                <QuestionDetails 
                    question={question}
                    selectedChoice={selectedChoice}
                    handleChoiceChange={handleChoiceChange}
                    submitting={submitting}
                    message={message}
                    onVoteSubmit={onVoteSubmit}
                />
                <FixedButton 
                    isVisible 
                    callback={() => navigate("/questions")} 
                    iconComponent={<FaArrowCircleLeft/>}
                    label="Back"
                />
            </div>
            
    );
});

