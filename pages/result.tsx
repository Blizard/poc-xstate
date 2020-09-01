import React, { useContext } from 'react'
import { MachineContext } from '../xstate/machine.context'

const Result = () => {
  const machine = useContext(MachineContext)

  const credentials = machine.context.credentials

  const onClickHandler = () => machine.send({ type: 'NEW' })

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      Your collected data:<br/><br />

      Name: {credentials.name} <br />
      Surname: {credentials.surname} <br />
      Age: {credentials.age} <br />
      Email: {credentials.email} <br />
      Gender: {credentials.gender} <br />

      <button onClick={onClickHandler}>
        Start again
      </button>

    </main>
  )
}

export default Result
