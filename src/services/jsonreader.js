import axios from 'axios';

const questionsUrl = 'http://localhost:3001'
const answersUrl = 'http://localhost:3002'

const getQuestions = () => {
    const request = axios.get(`${questionsUrl}/questions`)
    return request.then(response => response.data)
}

const getAnswers = () => {
    const request = axios.get(`${answersUrl}/answers`)
    return request.then(response => response.data)
}

export default {getQuestions, getAnswers}