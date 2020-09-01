import { assign } from 'xstate'
import { TMachineContext } from '../machine.types'

export interface FetchEvent {
  type: string
  data: {
    list: Item[]
  }
}

export interface Item {
  name: string
  surname: string
}

export interface ManData {
  dummyData: Item[]
}

export const manData = {
  dummyData: []
}

export const dummyFetch = () => fetch('https://run.mocky.io/v3/2cdaf6e1-abcf-418a-a225-0637183d345b?mocky-delay=2000ms')
  .then((response) => response.json())

export const setDummyList = assign<TMachineContext, FetchEvent>({ man: (context, event) => ({ ...context.man, dummyData: event.data.list }) })
