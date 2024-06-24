import { useReducer, useContext } from 'react'
import CounterContext from './CounterContext'
import Button from './components/Button'
import Display from './components/Display'


const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type="INC" label='+' />
        <Button type="DEC" label='-' />
        <Button type="ZERO" label='zero' />
      </div>
    </div>
  )
}

export default App