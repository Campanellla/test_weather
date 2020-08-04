export const checkValidity = ({
  requestTime = 0,
  forecastRequestTime = 0,
}: any = {}) => {
  const currentTime = new Date().getTime()

  const validCurrentWeather = currentTime - requestTime < 60 * 1000 // 1 min
  const validForecast = currentTime - forecastRequestTime < 15 * 60 * 1000 // 15 min

  return [validCurrentWeather, validForecast]
}
