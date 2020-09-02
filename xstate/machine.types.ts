import { Credentials } from './node/credentials'
import { MaleData } from './node/male'
import { TCreateContext } from 'use-machine'
import { EventObject } from 'xstate'
import { FemaleData } from './node/female'

export type TMachineContext = {
  credentials: Credentials
  male: MaleData
  female: FemaleData,
  result: object,
  loading: boolean
}

export enum MachineState {
  welcome = 'welcome',
  credentials = 'credentials',
  male = 'male',
  female = 'female',
  result = 'result',
  error = 'error'
}

export type TMachineSchema = {
  states: {
    [MachineState.welcome]: {},
    [MachineState.credentials]: {},
    [MachineState.male]: {},
    [MachineState.female]: {},
    [MachineState.result]: {},
    [MachineState.error]: {}
  }
}

export enum MachineEvents {
  START = 'START',
  CONTINUE = 'CONTINUE',
  NEW = 'NEW'
}
// TODO-SPURNY (Ales Spurny, 02/09/2020, i have not found better solution so "any" here is necessary)
export interface TMachineEvent<TMachineEventData = any> extends EventObject {
  type: MachineEvents.START | MachineEvents.CONTINUE | MachineEvents.NEW
  data: TMachineEventData
}

export type TMachine = TCreateContext<TMachineContext, TMachineSchema, TMachineEvent>
