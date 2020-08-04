import {
  SET_LOCATION_WEATHER,
  SET_LOCATION_WEATHER_ERROR,
  SET_LOCATION_WEATHER_LOADING,
} from 'src/actions/types'

const weatherByLocation = (
  state: WeatherState = {},
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case SET_LOCATION_WEATHER:
      return {
        ...state,
        ...action.weather,
      }

    case SET_LOCATION_WEATHER_LOADING:
      return { ...state, loading: true }

    case SET_LOCATION_WEATHER_ERROR:
      return { ...state, error: action.error, loading: false }

    default:
      return state
  }
}

export default weatherByLocation
