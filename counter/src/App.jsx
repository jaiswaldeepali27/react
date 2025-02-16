import { useState } from 'react'
import './App.css'
import Card from './components/card'


function App() {

  const [counter, setCounter] = useState(0)

  const addValue = () => {
    if (counter < 20) {
      
      setCounter(counter + 1) 
    }
  }

  const removeValue = () => {
    if (counter >= 1) {
      setCounter(counter - 1)
    }
  }

  return (
    <>
      <h1>Counter</h1>
      <h2>counter value : {counter}</h2>

      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>
      <Card username="Deepali" btnText="click me"/>
    </>
  )
}

export default App
