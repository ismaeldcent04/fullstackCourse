import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";
export const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (newNote) => {
  return axios.post(baseUrl, newNote).then((res) => res.data);
};

export const updateAnecdote = (anecdote) => {
  return axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
};
