import {
  SET_LOCATION_WEATHER,
  SET_LOCATION_WEATHER_LOADING,
  SET_LOCATION_WEATHER_ERROR,
} from './types'

import store from 'src/store'

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

export const getLocationWeather = () => {
  const lastRequestTime = store.getState().weatherByLocation.requestTime
  if (
    lastRequestTime != null &&
    new Date().getTime() - lastRequestTime < 600000
  ) {
    return { type: 'drop' }
  }

  return async function (dispatch) {
    dispatch(setLocationWeather_Loading())

    try {
      const { coords } = await new Promise((resolve) =>
        navigator?.geolocation.getCurrentPosition(resolve)
      )

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )

      const weather = await response.json()

      dispatch(setLocationWeather(weather))
    } catch (error) {
      dispatch(setLocationWeather_Error(error))
    }
  }
}
