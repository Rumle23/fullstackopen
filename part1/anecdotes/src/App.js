import React, { useState } from "react";

const Anecdote = ({ anecdotes, votes, selected }) => (
  <>
    <p>{anecdotes[selected]}</p>
    <p>Has {votes[selected]} votes</p>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const votesHandler = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const selectHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const indexOfMaxValue = votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdotes={anecdotes} votes={votes} selected={selected} />
      <button onClick={votesHandler}>Vote</button>
      <button onClick={selectHandler}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <Anecdote
        anecdotes={anecdotes}
        votes={votes}
        selected={indexOfMaxValue}
      />
    </div>
  );
};

export default App;
