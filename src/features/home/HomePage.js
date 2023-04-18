import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent/agent";
import { useNavigate } from 'react-router-dom';
import Loading from "../../app/layout/Loading";
import { FaHistory } from "react-icons/fa";
import FixedButton from "../../app/common/FixedButton";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkServerHealth = () => {
        setLoading(true); 
        agent.ServerHealth.get().then(res => {
            console.log(res)
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

    return <>{ loading ? <Loading/> : 
                <FixedButton 
                    onClick={checkServerHealth}
                    iconComponent={FaHistory}
                    callback={checkServerHealth}
                    label={"Retry"}
                />                
            }</>
}

export default HomePage;