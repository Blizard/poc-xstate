import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { useMachine } from 'use-machine'

import '../styles/globals.css'
import { TMachineContext, TMachineEvent, TMachineSchema } from '../xstate/machine.types'
import { initialContext, machineConfig, machineOptions } from '../xstate/machine'
import { MachineContext } from 'xstate/machine.context'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const machine = useMachine<TMachineSchema, TMachineEvent, TMachineContext>(machineConfig, machineOptions, initialContext)

  useEffect(() => {
    machine.service.start()
    machine.service.onTransition((state) => {
      console.log(state)
      if (state.history && state.history?.value) {
        console.log('transition from ', state.history.value, ' to ', state.value)
      } else {
        console.log('transition to ', state.value)
      }
    })
  }, [])

  useEffect(() => {
    router.replace(`/${machine.state.value}`)
  }, [machine.state])

  return (
    <MachineContext.Provider
      value={machine}
    >
      <Component {...pageProps} />
    </MachineContext.Provider>
  )
}

export default MyApp
