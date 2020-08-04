import {
  SET_CITY_WEATHER,
  SET_CITY_WEATHER_LOADING,
  SET_LOCATION_WEATHER_ERROR,
} from 'src/actions/types'

const weatherByCity = (
  state: CitiesWeatherState = {},
  action: WeatherAction
): CitiesWeatherState => {
  const { city = '_' } = action
  const currentState = state[city] || {}

  switch (action.type) {
    case SET_CITY_WEATHER:
      state[city] = {
        ...currentState,
        ...action.weather,
      }
      return { ...state }

    case SET_CITY_WEATHER_LOADING:
      state[city] = { ...currentState, loading: true }
      return { ...state }

    case SET_LOCATION_WEATHER_ERROR:
      state[city] = { ...currentState, error: action.error! }
      return { ...state }

    default:
      return state
  }
}

export default weatherByCity
