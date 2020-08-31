import { Credentials, CredentialsFormEvent, setCredentials } from './node/credentials'
import { ManData } from './node/man'
import { TCreateContext } from 'use-machine'

export type TMachineContext = {
  credentials: Credentials
  man: ManData
  woman: object,
  result: object,
  loading: boolean
}

export type TMachineSchema = {
  states: {
    welcome: {},
    credentials: {},
    man: {},
    woman: {},
    result: {},
    error: {}
  }
}

type Start = { type: 'START' }
type Continue = { type: 'CONTINUE' }
type New = { type: 'NEW' }

export type TMachineEvent = Start | Continue | New | CredentialsFormEvent

export type TMachine = TCreateContext<TMachineContext, TMachineSchema, TMachineEvent>
