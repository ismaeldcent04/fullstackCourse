import React from "react";
import { useParams } from "react-router-dom";

export const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === Number(id));

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        for more info see <a href={anecdote.info}>info</a>
      </div>
      <div>has {anecdote.votes} votes</div>
    </div>
  );
};
