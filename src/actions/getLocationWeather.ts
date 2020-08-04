import store from 'src/store'

import getPosition from 'src/lib/getPosition'
import {
  checkLoading,
  checkValidity,
  getForecast,
  validateResponse,
  validateForecastResponse,
} from './helpers'
import {
  SET_LOCATION_WEATHER,
  SET_LOCATION_WEATHER_LOADING,
  SET_LOCATION_WEATHER_ERROR,
} from './types'

import type { ThunkAction } from 'redux-thunk'
import type { Action } from 'redux'

export const setLocationWeather = (weather = {}) => ({
  type: SET_LOCATION_WEATHER,
  weather,
})

export const setLocationWeather_Loading = () => ({
  type: SET_LOCATION_WEATHER_LOADING,
})

export const setLocationWeather_Error = (error: Error) => ({
  type: SET_LOCATION_WEATHER_ERROR,
  error,
})

export const getLocationWeather = ():
  | ThunkAction<void, ReduxState, unknown, Action<string>>
  | { type: string } => {
  const currentState = store.getState().weatherByLocation

  const [validCurrentWeather, validForecast] = checkValidity(currentState)

  if (validCurrentWeather || checkLoading(currentState)) return { type: 'drop' }

  return async function (dispatch) {
    dispatch(setLocationWeather_Loading())

    try {
      const coords = await getPosition()

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )

      const weather: WeatherState = await response.json()

      if (!validateResponse(weather as WeatherResponse))
        throw new Error('Server responded with incorrect response.')

      weather.loading = false
      weather.error = null
      weather.requestTime = new Date().getTime()

      if (!validForecast) weather.loadingForecast = true

      dispatch(setLocationWeather(weather))

      if (!validForecast) {
        try {
          const forecast = await getForecast(coords.latitude, coords.longitude)

          if (!validateForecastResponse(forecast))
            throw new Error(
              'Server responded forecast with incorrect response.'
            )

          dispatch(
            setLocationWeather({
              ...weather,
              ...forecast,
              loadingForecast: false,
              forecastError: null,
              forecastRequestTime: new Date().getTime(),
            })
          )
        } catch (forecastError) {
          dispatch(
            setLocationWeather({
              loadingForecast: false,
              forecastError,
              forecastRequestTime: 0,
            })
          )
        }
      }
    } catch (error) {
      dispatch(setLocationWeather_Error(error))
    }
  }
}
