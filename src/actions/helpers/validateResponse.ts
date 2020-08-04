import _ from 'lodash'

export const validateResponse = (weatherResponse: WeatherResponse) => {
  if (!weatherResponse) return false

  const { dt, main, name, weather, wind, sys } = weatherResponse

  if (!_.isNumber(dt)) return false
  if (!_.isString(name)) return false
  if (!_.isString(weather?.[0]?.icon)) return false
  if (!_.isNumber(main?.temp)) return false
  if (!_.isNumber(wind.speed)) return false
  if (!_.isNumber(sys.sunrise)) return false

  return true
}

export const validateForecastResponse = (
  forecastResponse: ForecastResponse
) => {
  if (!forecastResponse) return false

  const { hourly, daily } = forecastResponse

  if (!_.isArray(hourly)) return false
  if (!_.isArray(daily)) return false
  if (!_.isNumber(hourly[0]?.dt)) return false
  if (!_.isString(hourly[0]?.weather?.[0]?.icon)) return false

  if (!_.isNumber(daily[0]?.dt)) return false
  if (!_.isString(daily[0]?.weather?.[0]?.icon)) return false

  return true
}
