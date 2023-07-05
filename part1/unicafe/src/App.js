import { useState } from 'react';

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
}

const StatisticLine = (props) => {
  return(
    <tr>
      <th>{props.text}:</th>
      <td>{props.value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  
  const good = props.statistics.good;
  const neutral = props.statistics.neutral;
  const bad = props.statistics.bad;

  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <p>No feedback given</p>
    );
  }

  const goodValue = props.value.good;
  const neutralValue = props.value.neutral;
  const badValue = props.value.bad;

  const all = good + neutral + bad;
  const average = (good * goodValue + neutral * neutralValue + bad * badValue) / ((all === 0) ? 1 : all);
  const positive = good * 100 / ((all === 0) ? 1 : all)

  

  return(
    <table>
      <tbody>
      <StatisticLine text='Good' value={good} />
      <StatisticLine text='Neutral' value={neutral} />
      <StatisticLine text='Bad' value={bad} />
      <StatisticLine text='All' value={all} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive' value={`${positive}%`} />
      </tbody>
    </table>
    
    
  );
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const value = {
    good: 1,
    neutral: 0,
    bad: -1
  }


  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      {' '}
      <Button handleClick={handleGood} text='Good' />
      {' '}
      <Button handleClick={handleNeutral} text='Neutral' />
      {' '}
      <Button handleClick={handleBad} text='Bad' />
      {' '}
      <h2>Statistics</h2>
      {' '}
      <Statistics statistics={{good:good, neutral:neutral, bad:bad}} value={value} />
    </div>
  );
}

export default App;
