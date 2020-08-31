import { MachineConfig } from 'xstate'

import { credentials, isMan, isWoman, setCredentials } from './node/credentials'
import { womanData } from './node/woman'
import { dummyFetch, manData, setDummyList } from './node/man'
import { result } from './node/result'
import { TMachineContext, TMachineEvent, TMachineSchema } from './machine.types'
import { loaded, loading } from './actions/loading'

export const initialContext = { credentials, man: manData, woman: womanData, result, loading: false }

export const machineConfig: MachineConfig<TMachineContext, TMachineSchema, TMachineEvent> = {
  id: "machine",
  initial: "welcome",
  context: initialContext,
  states: {
    welcome: {
      on: { START: 'credentials' }
    },
    credentials: {
      always: [
        { target: 'man', cond: 'isMan' },
        { target: 'woman', cond: 'isWoman' }
      ],
      on: {
        CONTINUE: {
          target: 'credentials',
          actions: 'setCredentials'
        }
      }
    },
    man: {
      on: { CONTINUE: 'result' },
      entry: ['loading'],
      invoke: {
        id: 'dummyFetch',
        src: dummyFetch,
        onDone: {
          actions: [setDummyList, 'loaded']
        },
        onError: {
          target: 'error',
          actions: ['loaded']
        }
      }
    },
    woman: {
      on: { CONTINUE: 'result' }
    },
    result: {
      on: { NEW: 'credentials' }
    },
    error: {

    }
  }
}

export const machineOptions = {
  actions: {
    setCredentials, loading, loaded
  },
  guards: {
    isMan, isWoman
  }
}


