import React, { useContext, useEffect } from 'react'
import { MachineContext } from '../xstate/machine.context'

export default function Home() {
  const machine = useContext(MachineContext)

  const onClickHandler = () => machine.send({ type: 'START' })

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      <button onClick={onClickHandler}>Press to continue</button>
    </main>
  )
}
