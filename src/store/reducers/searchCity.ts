import { SET_SEARCH_CITY } from 'src/actions/types'

type ListCities = {
  results: { [key: string]: { title: string }[] }
  isLoading: boolean
}

type ListCitiesAction = {
  type: string
  results: { title: string }[]
  isLoading: boolean
  city: string
}

const searchCity = (
  state: ListCities = { results: {}, isLoading: false },
  action: ListCitiesAction
): ListCities => {
  const { city = '_' } = action

  switch (action.type) {
    case SET_SEARCH_CITY:
      state.results[city] = { ...action.results }
      state.isLoading = action.isLoading
      return { ...state }

    default:
      return state
  }
}

export default searchCity
