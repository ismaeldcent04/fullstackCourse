import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const newAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdotes(content));
    dispatch(setNotification(`${content} anecdote created`, 5000));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
