import { useSelector, useDispatch } from "react-redux";

import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { Notification } from "./components/Notification";
import { store } from "./store";
import { useEffect } from "react";
import anecdoteServices from "./services/anecdoteServices";
import { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;