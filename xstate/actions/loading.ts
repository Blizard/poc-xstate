import { assign } from 'xstate'
import { TMachineContext, TMachineEvent } from '../machine.types'

export const loading = assign<TMachineContext, TMachineEvent>({ loading: () => true })
export const loaded = assign<TMachineContext, TMachineEvent>({ loading: () => false })
