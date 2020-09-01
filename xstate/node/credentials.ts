import { assign } from 'xstate'
import { TMachineContext, TMachineEvent } from '../machine.types'

export enum GENDER {
  MAN = 'MAN',
  WOMAN = 'WOMAN'
}

export interface Credentials {
  isFilled: boolean
  name: string
  surname: string
  age: number
  email: string,
  gender: GENDER
}

export const credentials = {
  isFilled: false,
  name: '',
  surname: '',
  age: 0,
  email: '',
  gender: GENDER.MAN
}

export const setCredentials = assign<TMachineContext, TMachineEvent>({
  credentials: (context, { values }) => ({ ...values, isFilled: true })
})

export const isMan = ({ credentials }: TMachineContext) => credentials.isFilled && credentials.gender === GENDER.MAN

export const isWoman = ({ credentials }: TMachineContext) => credentials.isFilled && credentials.gender === GENDER.WOMAN
