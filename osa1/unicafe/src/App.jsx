import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ value }) => {
  if (value === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
        <tbody>
          <StatisticLine text={'Good'} value={good} />
          <StatisticLine text={'Neutral'} value={neutral} />
          <StatisticLine text={'Bad'} value={bad} />
          <StatisticLine text={'All'} value={good + neutral + bad} />
          <StatisticLine text={'Average'} value={(good - bad)/(good + neutral + bad)} />
          <StatisticLine text={'Positive'} value={good/(good + neutral + bad) * 100 + ' %'} />
        </tbody>
      </table>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <h1>Statistics</h1>
      <Statistic value={good + neutral + bad} />
    </div>
  )
}

export default App
