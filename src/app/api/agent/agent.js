import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response) => response.data;

const requests = {
    get: (url, params) => axios.get(url, params).then(responseBody),
    put: (url, params) => axios.put(url, params).then(responseBody),
    post: (url, params) => axios.post(url, params).then(responseBody)
}

const Questions = {
    get: (id) => requests.get('/questions/' + id),
    list: (params) => requests.get('/questions', params),
    update: (id, params) => requests.put(`/questions/${id}`, params),
    share: (params) => requests.post('/share', params)
}

const ServerHealth = {
    get: () => requests.get('/health')
}

const agent = {
    Questions,
    ServerHealth
}

export default agent;