import { assign } from 'xstate'
import { TMachineContext, TMachineEvent } from '../machine.types'
import { initialContext } from '../machine'

export const result = {

}

export const resetContext = assign<TMachineContext, TMachineEvent>(() => initialContext)
