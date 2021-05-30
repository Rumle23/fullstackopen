import React, { useState } from "react";

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad;
  const average = props.good - props.bad;
  if (sum === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={sum} />
          <Statistic text="average" value={average / sum} />
          <Statistic text="positive" value={(props.good / sum) * 100 + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const FeedbackButtons = ({ goodHandle, neutralHandle, badHandle }) => {
  return (
    <>
      <button onClick={goodHandle}>Good</button>
      <button onClick={neutralHandle}>Neutral</button>
      <button onClick={badHandle}>Bad</button>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <FeedbackButtons
        goodHandle={() => setGood(good + 1)}
        neutralHandle={() => setNeutral(neutral + 1)}
        badHandle={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
