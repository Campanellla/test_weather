import store from 'src/store'

import {
  checkLoading,
  checkValidity,
  getForecast,
  validateResponse,
  validateForecastResponse,
} from './helpers'
import {
  SET_CITY_WEATHER,
  SET_CITY_WEATHER_LOADING,
  SET_CITY_WEATHER_ERROR,
} from './types'

export const setCityWeather = (city: string, weather: WeatherState = {}) => ({
  type: SET_CITY_WEATHER,
  city,
  weather,
})

export const setCityWeather_Loading = (city: string) => ({
  type: SET_CITY_WEATHER_LOADING,
  city,
})

export const setCityWeather_Error = (city: string, error: Error) => ({
  type: SET_CITY_WEATHER_ERROR,
  city,
  error,
})

export const getCityWeather = (city = '') => {
  if (city === '') return { type: 'drop' }
  const currentState = store.getState().weatherByCity[city]

  const [validCurrentWeather, validForecast] = checkValidity(currentState)

  if (validCurrentWeather || checkLoading(currentState)) return { type: 'drop' }

  return async function (dispatch) {
    dispatch(setCityWeather_Loading(city))

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )

      const weather: WeatherState = await response.json()

      if (!validateResponse(weather as WeatherResponse))
        throw new Error('Server responded with incorrect response.')

      weather.loading = false
      weather.error = null
      weather.requestTime = new Date().getTime()

      if (!validForecast) weather.loadingForecast = true

      dispatch(setCityWeather(city, weather))

      if (!validForecast) {
        try {
          const forecast = await getForecast(
            weather.coord?.lat,
            weather.coord?.lon
          )

          if (!validateForecastResponse(forecast))
            throw new Error(
              'Server responded forecast with incorrect response.'
            )

          dispatch(
            setCityWeather(city, {
              ...weather,
              ...forecast,
              loadingForecast: false,
              forecastError: null,
              forecastRequestTime: new Date().getTime(),
            })
          )
        } catch (forecastError) {
          dispatch(
            setCityWeather(city, {
              loadingForecast: false,
              forecastError,
              forecastRequestTime: 0,
            })
          )
        }
      }
    } catch (error) {
      dispatch(setCityWeather_Error(city, error))
    }
  }
}
