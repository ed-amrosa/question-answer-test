import React, {useEffect, useState} from "react";
import { useSearchParams} from "react-router-dom";
import { observer } from "mobx-react-lite";
import agent from "../../app/api/agent/agent";
import Loader from "../../app/layout/Loader";
import QuestionListItem from "./QuestionListItem";
import useInfiniteScroller from "../../app/hooks/useInfiniteScroller";
import ScrollTopButton from "../../app/common/ScrollTopButton";
import { useStore } from "../stores/store";

export default observer(function QuestionListPage() {
    //Using MOBX question store to remove alot of the logic from the components
    const {questionStore} = useStore();
    const {filter, loadingList, questionList, resetQuestionList, setFilter, loadQuestionList, addQuestionList} = questionStore;
    const [searchParams, setSearchParams] = useSearchParams();
    const [fetching, setFetching] = useInfiniteScroller(loadMoreQuestions);
    const [offset, setOffset]= useState(0);
    
    const onFilterChange = (e) => {
        resetQuestionList();
        setSearchParams({filter: e.target.value});
        setFilter(e.target.value);
    }

    //extracted to be easily used with the Infinite Scroller Hook
    function loadMoreQuestions() {
        setFetching(true);
        agent.Questions.list({limit: 10, offset: offset, filter: filter}).then(res => {
            addQuestionList(res);
            setFetching(false);
        }). catch(error => setFetching(false));
        setOffset(prevState => prevState + 1);
    }

    //clears filter and filter search parameter
    const clearSearch = () => {
        resetQuestionList();
        setSearchParams({});
        setFilter('');
    }

    useEffect(()=>{
        setFilter(searchParams.get('filter'));
        loadQuestionList();
    }, [filter])

    return (<>
        <ScrollTopButton />
        <div className="details-panel">
            <div className="details-panel-header m-8">
                <div className="filter-input">
                    <div className="filter-label">Filter</div> 
                    <input 
                        onChange={onFilterChange}
                        value={filter ? filter : ''} 
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
                    questionList.map((question, index) =>
                        <>        
                            <QuestionListItem 
                                key={`question-${index}`}
                                question={question} 
                            />   
                            <div className="divider-xs"/>     
                        </>
                    )
                }
                {(loadingList || fetching) && <div className="loader-container-xs"><Loader/></div>}
            </div>
        </div>
    </>);
});
