import React, { useContext } from 'react'

import { MachineContext } from '../xstate/machine.context'
import { Loader } from '../components/loader'
import { MachineEvents } from '../xstate/machine.types'

export default function Male() {
  const machine = useContext(MachineContext)

  const data = machine.context.male.dummyData
  const loading = machine.context.loading

  const onClickHandler = () => machine.send({ type: MachineEvents.CONTINUE })

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      List of available contacts<br /><br />

      {loading ? (<Loader />) : (
      <table>
        <tbody>
          {data && data.length > 0 ? data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.surname}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
      )}

      <br /><br />
      <button onClick={onClickHandler} hidden={loading}>
        Continue to result
      </button>

    </main>
  )
}
