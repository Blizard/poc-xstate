import React, { useContext } from 'react'

import { MachineContext } from '../xstate/machine.context'
import { MachineEvents } from '../xstate/machine.types'

export default function Home() {
  const machine = useContext(MachineContext)

  const onClickHandler = () => machine.send({ type: MachineEvents.START })

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      <button onClick={onClickHandler}>Press to continue</button>
    </main>
  )
}
