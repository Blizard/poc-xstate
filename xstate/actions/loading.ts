import { assign } from 'xstate'

export const loading = assign({ loading: () => true })
export const loaded = assign({ loading: () => false })
