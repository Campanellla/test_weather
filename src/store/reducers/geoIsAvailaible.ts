import { SET_GEO } from 'src/actions/types'

const searchCity = (
  state: boolean | string = false,
  action
): string | boolean => {
  switch (action.type) {
    case SET_GEO:
      return action.state

    default:
      return state
  }
}

export default searchCity
