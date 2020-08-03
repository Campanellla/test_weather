import {
  SET_CITY_WEATHER,
  SET_CITY_WEATHER_LOADING,
  SET_CITY_WEATHER_ERROR,
} from './types'

import store from 'src/store'

export const setCityWeather = (city: string, weather = {}) => ({
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
  const lastRequestTime = store.getState().weatherByCity[city]?.requestTime
  if (
    lastRequestTime != null &&
    new Date().getTime() - lastRequestTime < 600000
  ) {
    return { type: 'drop' }
  }

  return async function (dispatch) {
    dispatch(setCityWeather_Loading(city))

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )

      const weather = await response.json()

      dispatch(setCityWeather(city, weather))
    } catch (error) {
      dispatch(setCityWeather_Error(city, error))
    }
  }
}
