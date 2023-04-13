import React, { useEffect, useState } from "react";
import agent from "../api/agent/agent";
import { useNavigate } from 'react-router-dom';
import Loading from "../layout/Loading";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkServerHealth = () => {
        setLoading(true); 
        agent.ServerHealth.get().then(res => {
            setLoading(false);
            if(res.status === "OK") {
                navigate('/questions');
            }
        }).catch(error => {
            setLoading(false);
            navigate('/');
        });
    }

    useEffect(() => {
        checkServerHealth();
    }, []);

    return (
        <>
            { loading ? <Loading/> : 
                <button onClick={checkServerHealth}>
                    Retry Action
                </button>
            }
        </>
    );
}

export default HomePage;