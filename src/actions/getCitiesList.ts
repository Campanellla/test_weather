import { SET_SEARCH_CITY } from './types'

import store from 'src/store'

export const setSearchCity = (
  city: string,
  isLoading = false,
  results = []
) => ({
  type: SET_SEARCH_CITY,
  city,
  isLoading,
  results,
})

export const getCitiesList = (city = '') => {
  if (city === '' || store.getState().searchCity.results[city] != null) {
    return { type: 'drop' }
  }

  return async (dispatch) => {
    dispatch(setSearchCity(city, true))

    fetch(`/api/findcity?city=${city}`)
      .then((e) => e.json())
      .then((results) => {
        dispatch(setSearchCity(city, false, results))
      })
      .catch((e) => {
        dispatch(setSearchCity(city, false))
      })
  }
}
