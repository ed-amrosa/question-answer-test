import { makeAutoObservable, runInAction, configure } from "mobx";
import agent from "../../app/api/agent/agent";

configure({
    useProxies: "never"
});

//Used MOBX to control question store state, as it is a simple and horizontally scalable tool suitable for this problem
//I'm mostly confortable with redux, but would be a bad decision to use it in this case, larger code necessity / overhead
//Redux scales better vertically, mainly for bulkier applications with larger data structures

class QuestionStore {
    questionList = [];
    question = {};
    selectedQuestion = '';
    fetchingMore = false;
    editMode=false;
    loadingList = false;
    loadingDetails = false;
    submitting=false;
    filter = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setFilter = (filter) => {
        this.filter = filter;
    }

    resetQuestionList = () => {
        this.questionList.replace([]);
    }

    addQuestionList = (newQuestions) => {
        this.questionList.replace(this.questionList.concat(newQuestions));
    }

    loadQuestionList = () => {
        console.log("yoo")
        this.loadingList = true;
        agent.Questions.list({limit: 10, offset: 0, filter: ''}).then(res => {
            runInAction(() =>  {
                this.questionList.replace(res);
                this.loadingList = false})
        }).catch(error => {
            runInAction(() =>  this.loadingList = false);
        });
    }

    incrementOffset() {
        this.offset++;
    }


    loadQuestion = (id) => {
        let question = this.questionList.find(question => question.id === id);

        if(question) {
            return question;
        } 
            
        this.loadingDetails = true;
        agent.Questions.get(id).then(res =>{
            this.question = res;
            this.loadingDetails = false;
        }).catch(error => {
            console.log("Error retrieving question.")
            this.loadingDetails = false;
        })
    }

    createQuestion = (question) => {
        agent.Questions.create(question).then(res => {
            this.questionList.replace(this.questionList.push(question));
        }).catch(error => console.log("Rrror creating question"));  
    }

    editQuestion = (id, updatedQuestion) => {
        this.submitting = true;
        agent.Questions.update(id, updatedQuestion).then(res => {
            const questionIndex = this.questionList.map(q => q.id).indexOf(updatedQuestion.id);
            this.questionList[questionIndex] = updatedQuestion;
            this.questionList.replace(this.questionList);
            this.submitting = false;
            this.message = "Vote submitted successfully";
        }).catch(error => {
            this.message = "Error submitting vode";
            this.submitting = false;
            console.log("Error submitting questio")
        })
    }
}


export default QuestionStore;