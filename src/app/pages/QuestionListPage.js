import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import agent from "../api/agent/agent";
import Loader from "../layout/Loader";
import QuestionListItem from "../../features/question/QuestionListItem";
import useInfiniteScroller from "../hooks/useInfiniteScroller";
import ScrollTopButton from "../common/ScrollTopButton";

function QuestionListPage() {
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useInfiniteScroller(loadMoreData);
    const [offset, setOffset] = useState(1);

    const onFilterChange = (e) => {
        setQuestionList([]);
        setSearchParams({filter: e.target.value});
        setFilter(e.target.value);
    }

    const clearSearch = () => {
        setSearchParams({});
        setFilter('');
    }

    const loadData = () => {
        setLoading(true);
        agent.Questions.list({params: {limit: 5, offset: offset,filter: searchParams.get('filter')}}).then(res => {
            setQuestionList(res);
            setLoading(false);
        });
    }

    function loadMoreData() {
        setFetching(true);
        agent.Questions.list({params: {limit: 5, offset: offset, filter:  searchParams.get('filter')}}).then(res => {
            setQuestionList(prevItems => [...prevItems, ...res]);
            setTimeout(() => {setFetching(false)}, 1000);
        });
        setOffset(prevOffset => prevOffset + 1);
    };

    useEffect(()=>{
        setFilter(searchParams.get('filter'));
        loadData();
    }, [searchParams])

    return (<>
        <ScrollTopButton />
        <div className="details-panel">
            <div className="details-panel-header m-8">
                <div className="filter-input">
                    <div className="filter-label">Filter</div> 
                    <input 
                        onChange={onFilterChange}
                        value={filter} 
                        className="textbox" 
                        type="text" 
                        style={{width: "50%"}}
                        autoFocus={searchParams.get('filter') !== null}
                        />
                        <button onClick={clearSearch}>Clear Search</button>    
                </div>
            </div>
            <div className="divider"/>
            <div style={{background: "white", borderRadius: "4px"}}>
                {  
                    questionList.map(question =>
                        <>        
                            <QuestionListItem 
                                key={"question-" + question.id}
                                question={question} 
                            />   
                            <div className="divider-xs"/>     
                        </>
                    )
                }
                {(loading || fetching) && <div className="loader-container-xs"><Loader/></div>}
            </div>
        </div>
    </>);
}

export default QuestionListPage;