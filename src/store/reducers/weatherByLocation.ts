import {
  SET_LOCATION_WEATHER,
  SET_LOCATION_WEATHER_ERROR,
  SET_LOCATION_WEATHER_LOADING,
} from 'src/actions/types'

type WeatherByLocationState = {
  loading?: boolean
  error?: Error
  requestTime?: number
  [key: string]: any
}

const weatherByLocation = (
  state: WeatherByLocationState = { loading: true },
  action
): WeatherByLocationState => {
  switch (action.type) {
    case SET_LOCATION_WEATHER:
      return { ...action.weather, requestTime: new Date().getTime() }

    case SET_LOCATION_WEATHER_LOADING:
      return { loading: true }

    case SET_LOCATION_WEATHER_ERROR:
      return { error: action.error }

    default:
      return state
  }
}

export default weatherByLocation
