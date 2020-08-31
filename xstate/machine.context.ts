import { createContext } from 'react'

import { TMachine } from './machine.types'

export const MachineContext = createContext<TMachine>({} as TMachine)
