import { assign } from 'xstate'
import { TMachineContext, TMachineEvent } from '../machine.types'

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
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
  gender: GENDER.MALE
}

export const setCredentials = assign<TMachineContext, TMachineEvent<Credentials>>({
  credentials: (context, { data }) => ({ ...data, isFilled: true })
})

export const isMale = ({ credentials }: TMachineContext) => credentials.isFilled && credentials.gender === GENDER.MALE

export const isFemale = ({ credentials }: TMachineContext) => credentials.isFilled && credentials.gender === GENDER.FEMALE
