import { Credentials } from './node/credentials'
import { ManData } from './node/man'
import { TCreateContext } from 'use-machine'

export type TMachineContext = {
  credentials: Credentials
  man: ManData
  woman: object,
  result: object,
  loading: boolean
}

export enum MachineState {
  welcome = 'welcome',
  credentials = 'credentials',
  man = 'man',
  woman = 'woman',
  result = 'result',
  error = 'error'
}

export type TMachineSchema = {
  states: {
    [MachineState.welcome]: {},
    [MachineState.credentials]: {},
    [MachineState.man]: {},
    [MachineState.woman]: {},
    [MachineState.result]: {},
    [MachineState.error]: {}
  }
}

export enum MachineEvents {
  START = 'START',
  CONTINUE = 'CONTINUE',
  NEW = 'NEW'
}

export interface TMachineEvent {
  type: MachineEvents.START | MachineEvents.CONTINUE | MachineEvents.NEW
  values: Credentials
}

export type TMachine = TCreateContext<TMachineContext, TMachineSchema, TMachineEvent>
