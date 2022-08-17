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
        {text}: {value}
    </div>
  )
}

const Statistics = ({ good, bad, neutral, total }) => {
  if (total < 1) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <StatisticLine text="good" value={good} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="neutral" value={neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="bad" value={bad} />
          </td>
        </tr>
        <tr>
          <td>
            Average:{" "}
            {(good || neutral || bad) && (good + neutral - bad) / total}
          </td>
        </tr>
        <tr>
          <td>Positive: {(good || total) && (Math.floor((good / total) * 100))}%</td>
        </tr>
      </tbody>
    </table>
  );
};

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
      <h1><b>Statistics</b></h1>
      <hr/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App