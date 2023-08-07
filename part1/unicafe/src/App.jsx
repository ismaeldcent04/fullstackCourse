import { useState } from "react";
import { Header } from "./Header";
import { Button } from "./Button";
import { Statistics } from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;

  return (
    <>
      <Header title={"Give Feedback"} />
      <Button content={"good"} onClick={handleGood} />
      <Button content={"neutral"} onClick={handleNeutral} />
      <Button content={"bad"} onClick={handleBad} />
      <Statistics
        title={"Statistics"}
        goodFeedback={good}
        badFeedback={bad}
        neutralFeedback={neutral}
        totalFeedbacks={total}
        feedbackAverage={(good - bad) / total}
        goodFeedbackPrc={(good / total) * 100}
      />
    </>
  );
};

export default App;
