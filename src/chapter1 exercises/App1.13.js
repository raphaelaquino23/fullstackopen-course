import { useState } from 'react'

const TopScore = ({anecdotes, votesArray}) => {
  const votes = [...votesArray];
  const max = Math.max(...votes);
  const index = votes.indexOf(max);
  if(votes[index] < 1){
    return <div>No score recorded yet. . .</div>
  }
  return(
    <div>
      {anecdotes[index]}
      <br>
      </br><b>Score:</b> {votes[index]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'WOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!'
  ]
  const initializePointsArray = () =>{
    const points = [anecdotes.length];
    for(let i = 0; i < anecdotes.length; i++){
      points[i] = 0;
    }
    return points
  }

  const [selected, setSelected] = useState(0);
  const [votesArray, setVotesArray] = useState(initializePointsArray());

  const randomizeSelection = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  const addVote = () => {
    const votes = [...votesArray];
    votes[selected] += 1. 
    setVotesArray(votes);
  }
  
  return (
    <div>
      <h1><b>Anecdotes</b></h1>
      <h2>Top Voted Anecdote</h2>
      <TopScore anecdotes={anecdotes} votesArray={votesArray}/>
      <hr/>
      <h2>Current Anecdote</h2>
      <p>{anecdotes[selected]}</p>
      <p>Vote of {selected} position in array is {votesArray[selected]}</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={randomizeSelection}>Next anecdote</button>
    </div>
  )
}//

export default App