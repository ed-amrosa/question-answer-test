import React, {useEffect, useState} from "react";
import QuestionDetails from "../../features/question/QuestionDetails";
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../layout/Loading";
import agent from "../api/agent/agent";
import FixedButton from "../common/FixedButton";

function QuestionDetailsPage() {
    const {questionId} = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        agent.Questions.get(questionId).then(res => {
            setQuestion(res);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            navigate('/not-found')});
    },[])

    
    return (
        loading ? <Loading/> : 
            <div className="mock-container">
                <QuestionDetails 
                    question={question}
                />
                <FixedButton 
                    isVisible 
                    callback={() => navigate("/questions")} 
                    iconComponent={<FaArrowCircleLeft/>}
                    label="Back"
                />
            </div>
            
    );
}

export default QuestionDetailsPage;