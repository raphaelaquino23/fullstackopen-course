import { useState } from 'react'

const Button = ({setFeedback, title}) => {
  return(
    <div>
      <button onClick={setFeedback}>{title}</button>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <div>
      <p>
        {text}: {value}
      </p>
    </div>
  )
}

const Statistics = ({good, bad, neutral, total}) => {
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
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <p>
        Average: {(good || neutral || bad) && ((good + neutral - bad) / total)}%
      </p>
      <p>
        Positive: {(good || total ) && good / total}%
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
    console.log(good);
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1);
    console.log(neutral);
  }

  const setToBad = () => {
    setBad(bad + 1);
    console.log(bad);
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