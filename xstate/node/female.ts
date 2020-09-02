import { assign } from 'xstate'
import { TMachineContext, TMachineEvent } from '../machine.types'

export interface FemaleData {
  hasChildren: boolean
  isPregnant: boolean
}

export const femaleData = {
  hasChildren: false,
  isPregnant: false
}

export const setFemaleData = assign<TMachineContext, TMachineEvent<FemaleData>>({
  female: (context, { data }) => ({ ...data })
})
