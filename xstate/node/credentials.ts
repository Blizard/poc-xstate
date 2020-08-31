import { assign } from 'xstate'
import { TMachineContext } from '../machine.types'

export type CredentialsValues = Omit<Credentials, 'isFilled'>

export type CredentialsFormEvent = { type: 'SET_CREDENTIALS', values: CredentialsValues }

export interface Credentials {
  isFilled: boolean
  name: string
  surname: string
  age: number
  email: string,
  gender: 'MAN' | 'WOMAN'
}

export const credentials = {
  isFilled: false,
  name: '',
  surname: '',
  age: 0,
  email: '',
  gender: 'MAN'
}

export const setCredentials = assign<TMachineContext, CredentialsFormEvent>({
  credentials: (context, event) => ({ ...event.values, isFilled: true })
})

export const isMan = ({ credentials }: TMachineContext) => credentials.isFilled && credentials.gender === 'MAN'

export const isWoman = ({ credentials }: TMachineContext) => credentials.isFilled && credentials.gender === 'WOMAN'
