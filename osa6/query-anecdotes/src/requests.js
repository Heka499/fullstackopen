import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(response => response.data)

export const createAnecdote = (newObject) =>
    axios.post(baseUrl, newObject).then(response => response.data)

export const updateAnecdote = updateAnecdote =>
    axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(response => response.data)