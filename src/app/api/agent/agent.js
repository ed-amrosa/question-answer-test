import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response) => response.data;

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
} 

const requests = {
    get: (url) => axios.get(url).then(responseBody),
}

const Questions = {
    list: () => axios.get('/questions').then(responseBody),
}

const ServerHealth = {
    get: () => requests.get('/health')
}

const agent = {
    Questions,
    ServerHealth
}

export default agent;