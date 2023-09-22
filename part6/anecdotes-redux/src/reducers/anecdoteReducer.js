import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdoteServices";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdoteServices.createNew(content);
    dispatch(appendAnecdote(newAnecdotes));
  };
};

export const updateAnecdotes = (id, anecdotes) => {
  return async (dispatch) => {
    const anecdoteToUpdate = anecdotes.find((anecdote) => anecdote.id === id);
    const response = await anecdoteServices.update(id, {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    });

    const updatedAnecdotesArray = anecdotes.map((anecdote) =>
      anecdote.id !== id ? anecdote : response
    );

    dispatch(setAnecdotes(updatedAnecdotesArray));
  };
};

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_VOTE":
//       const selectAnecdote = state.find(
//         (anecdote) => anecdote.id === action.payload.id
//       );

//       const changedAnecdote = {
//         ...selectAnecdote,
//         votes: selectAnecdote.votes + 1,
//       };

//       return state.map((anecdote) =>
//         anecdote.id !== action.payload.id ? anecdote : changedAnecdote
//       );
//     case "ADD_ANECDOTE":
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

// export const AddVote = (id) => {
//   return {
//     type: "ADD_VOTE",
//     payload: { id },
//   };
// };

// export const AddAnecdote = (anecdote) => {
//   return {
//     type: "ADD_ANECDOTE",
//     payload: {
//       content: anecdote,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

export const { createAnecdote, addVote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
