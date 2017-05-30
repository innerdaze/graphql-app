import { Map as map } from 'immutable'
import immutableState from './ImmutableState'

export default (state = immutableState, action) => {
  switch (action.type) {
    case 'STARTING_REQUEST':
      return state.set('fetching', true)
    case 'FINISHED_REQUEST':
      return state.set('fetching', false)
        .set('data', action.response.data && map(action.response.data.goldberg))
    default:
      return state
  }
}
