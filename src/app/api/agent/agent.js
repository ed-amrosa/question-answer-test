import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response) => response.data;

const requests = {
    get: (url, params) => axios.get(url, params).then(responseBody),
    put: (url) => axios.put(url).then(responseBody)
}

const Questions = {
    get: (id) => requests.get('/questions/' + id),
    list: (params) => requests.get('/questions', params),
    update: (id) => requests.put(`/questions/${id}`),
}

const ServerHealth = {
    get: () => requests.get('/health')
}

const agent = {
    Questions,
    ServerHealth
}

export default agent;