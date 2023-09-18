import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log(state.filter);
    if (state.filter === "") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );
  });

  const orderedAnecdotes = anecdotes
    .map((anecdote) => anecdote)
    .sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const vote = (id, content, anecdotes) => {
    dispatch(updateAnecdotes(id, anecdotes));
    dispatch(setNotification(`you voted '${content}'`, 5000));
  };
  return orderedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => vote(anecdote.id, anecdote.content, orderedAnecdotes)}
        >
          {" "}
          vote
        </button>
      </div>
    </div>
  ));
};
