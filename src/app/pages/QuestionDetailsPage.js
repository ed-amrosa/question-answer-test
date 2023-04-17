import React, {useEffect, useState} from "react";
import QuestionDetails from "../../features/question/QuestionDetails";

import { useParams, useNavigate } from "react-router-dom";
import Loading from "../layout/Loading";
import agent from "../api/agent/agent";

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
            <>
                <QuestionDetails 
                    question={question}
                />
                <button onClick={() => navigate('/questions')}>Back</button>
            </>
    );
}

export default QuestionDetailsPage;