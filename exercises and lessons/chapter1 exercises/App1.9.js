import { useState } from 'react'

const Button = ({ setFeedback, title }) => {
  return(
    <div>
      <button onClick={setFeedback}>{title}</button>
    </div>
  )
}

const Statistics = ({ good, neutral, bad, total }) => { 
  if((total < 1)){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>
        <b>Statistics</b>
      </h1>
      <hr/>
      <p>
        Good: {good}
      </p>
      <p>
        Neutral: {neutral}
      </p>
      <p>
        Bad: {bad}
      </p>
      <p>
        All: {good + neutral}
      </p>
      <p>
        Average: {(good || neutral || bad) && ((good + neutral - bad) / total)}
      </p>
      <p>
        Positive: {(good || total) && (Math.floor((good / total) * 100))}%
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {
    setGood(good + 1);
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1);
  }

  const setToBad = () => {
    setBad(bad + 1);
  }

  const total = good + bad + neutral;
  return (
    <div>
      <div>
        <h1><b>Give Feedback</b></h1>
      </div>
      <div>
        <Button setFeedback={setToGood} title='good' />
        <Button setFeedback={setToNeutral} title='neutral'/>
        <Button setFeedback={setToBad} title='bad'/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App