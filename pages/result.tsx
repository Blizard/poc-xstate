import React, { useContext } from 'react'

import { MachineContext } from '../xstate/machine.context'
import { MachineEvents } from '../xstate/machine.types'
import { GENDER } from '../xstate/node/credentials'

const Result = () => {
  const machine = useContext(MachineContext)

  const credentials = machine.context.credentials
  const femaleData = machine.context.female

  const onClickHandler = () => machine.send({ type: MachineEvents.NEW })

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      Your collected data:<br/><br />

      Name: {credentials.name} <br />
      Surname: {credentials.surname} <br />
      Age: {credentials.age} <br />
      Email: {credentials.email} <br />
      Gender: {credentials.gender} <br />

      {credentials.gender === GENDER.FEMALE && (
        <>
          Has Children: {femaleData.hasChildren ? 'ok' : null}<br />
          Is Pregnant: {femaleData.isPregnant ? 'ok' : null}<br />
        </>
      )}

      <br />
      <button onClick={onClickHandler}>
        Start again
      </button>

    </main>
  )
}

export default Result
