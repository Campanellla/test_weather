import {
  SET_CITY_WEATHER,
  SET_LOCATION_WEATHER_ERROR,
  SET_CITY_WEATHER_LOADING,
} from 'src/actions/types'

type Weather = {
  loading?: boolean
  error?: Error
  requestTime?: number
  [key: string]: any
}

type WeatherByCityState = {
  [key: string]: Weather
}

type WeatherByCityAction = {
  type: string
  weather?: { [key: string]: any }
  city?: string
  error?: Error
}

const weatherByCity = (
  state: WeatherByCityState = {},
  action: WeatherByCityAction
): WeatherByCityState => {
  const { city = '_' } = action

  switch (action.type) {
    case SET_CITY_WEATHER:
      state[city] = { ...action.weather, requestTime: new Date().getTime() }
      return { ...state }

    case SET_CITY_WEATHER_LOADING:
      state[city] = { loading: true }
      return { ...state }

    case SET_LOCATION_WEATHER_ERROR:
      state[city] = { error: action.error! }
      return { ...state }

    default:
      return state
  }
}

export default weatherByCity
