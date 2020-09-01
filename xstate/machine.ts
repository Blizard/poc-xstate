import { MachineConfig, MachineOptions } from 'xstate'

import { credentials, isMan, isWoman, setCredentials } from './node/credentials'
import { womanData } from './node/woman'
import { dummyFetch, manData, setDummyList } from './node/man'
import { result } from './node/result'
import { MachineEvents, MachineState, TMachineContext, TMachineEvent, TMachineSchema } from './machine.types'
import { loaded, loading } from './actions/loading'

export const initialContext = { credentials, man: manData, woman: womanData, result, loading: false }

export const machineConfig: MachineConfig<TMachineContext, TMachineSchema, TMachineEvent> = {
  id: "machine",
  initial: MachineState.welcome,
  context: initialContext,
  states: {
    [MachineState.welcome]: {
      on: { START: MachineState.credentials }
    },
    [MachineState.credentials]: {
      always: [
        { target: MachineState.man, cond: 'isMan' },
        { target: MachineState.woman, cond: 'isWoman' }
      ],
      on: {
        [MachineEvents.CONTINUE]: {
          target: MachineState.credentials,
          actions: ['setCredentials']
        }
      }
    },
    [MachineState.man]: {
      on: {
        [MachineEvents.CONTINUE]: MachineState.result
      },
      entry: ['loading'],
      invoke: {
        id: 'dummyFetch',
        src: dummyFetch,
        onDone: {
          actions: [setDummyList, 'loaded']
        },
        onError: {
          target: MachineState.error,
          actions: ['loaded']
        }
      }
    },
    [MachineState.woman]: {
      on: { [MachineEvents.CONTINUE]: MachineState.result }
    },
    [MachineState.result]: {
      on: { [MachineEvents.NEW]: MachineState.credentials }
    },
    [MachineState.error]: {

    }
  }
}

export const machineOptions: MachineOptions<TMachineContext, TMachineEvent> = {
  actions: {
    setCredentials, loading, loaded
  },
  guards: {
    isMan, isWoman
  },
  activities: {},
  delays: {},
  services: {}
}


