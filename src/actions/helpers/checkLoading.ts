export const checkLoading = (weather: WeatherState = {}) => {
  return weather.loading || weather.loadingForecast
}
