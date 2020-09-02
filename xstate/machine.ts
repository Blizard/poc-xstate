import { MachineConfig, MachineOptions } from 'xstate'

import { credentials, isMale, isFemale, setCredentials } from './node/credentials'
import { setFemaleData, femaleData } from './node/female'
import { dummyFetch, maleData, setDummyList } from './node/male'
import { resetContext, result } from './node/result'
import { MachineEvents, MachineState, TMachineContext, TMachineEvent, TMachineSchema } from './machine.types'
import { loaded, loading } from './actions/loading'

export const initialContext = { credentials, male: maleData, female: femaleData, result, loading: false }

export const machineConfig: MachineConfig<TMachineContext, TMachineSchema, TMachineEvent> = {
  id: 'machine',
  initial: MachineState.welcome,
  context: initialContext,
  states: {
    [MachineState.welcome]: {
      on: { START: MachineState.credentials }
    },
    [MachineState.credentials]: {
      always: [
        { target: MachineState.male, cond: 'isMale' },
        { target: MachineState.female, cond: 'isFemale' }
      ],
      on: {
        [MachineEvents.CONTINUE]: {
          target: MachineState.credentials,
          actions: 'setCredentials'
        }
      }
    },
    [MachineState.male]: {
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
    [MachineState.female]: {
      on: {
        [MachineEvents.CONTINUE]: {
          target: MachineState.result,
          actions: ['setFemaleData']
        }
      }
    },
    [MachineState.result]: {
      on: {
        [MachineEvents.NEW]: {
          target: MachineState.welcome,
          actions: ['resetContext']
        }
      }
    },
    [MachineState.error]: {

    }
  }
}

export const machineOptions: MachineOptions<TMachineContext, TMachineEvent> = {
  actions: {
    setCredentials, setFemaleData, loading, loaded, resetContext
  },
  guards: {
    isMale, isFemale
  },
  activities: {},
  delays: {},
  services: {}
}


