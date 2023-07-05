import { useState } from 'react';

const MostVoted = ({vote, anecdotes}) => {

  const voteGreaterThanZero = vote.find(x => x > 0);

  if (voteGreaterThanZero === undefined) {
    return(
      <h2>Please vote for an anecdote</h2>
    );
  }

  //Code to get the greatest number from 
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
  const greatestVote = vote.reduce((a, b) => Math.max(a, b), -Infinity);
  const indexOfGreatestVote = vote.findIndex(element => element === greatestVote);

  return(
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfGreatestVote]}.</p>
      <p>Has {greatestVote} votes.</p>
    </>
  );



}

const Vote = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  );
}

const Button = (props) => {
  
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
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
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  

  //FUnction to get a random integer from 
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleClick = () => {
    const index = getRandomInt(0, anecdotes.length);
    setSelected(index);
  }

  const handleVote = () => {
    
    const newVote = [...vote];
    newVote[selected] += 1;

    setVote(newVote);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p> 
      <p>Has {vote[selected]} votes.</p>
      <br/>
      <Vote text='vote' handleClick={handleVote}/>
      {' '}
      <Button text='next anecdote' handleClick={handleClick}  />
      <br/>
      <MostVoted vote={vote} anecdotes={anecdotes}/>
    </div>
  );
}

export default App;
