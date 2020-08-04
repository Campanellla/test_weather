declare type WeatherResponse = {
  coord: { lon: number; lat: number }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

declare type ForecastResponse = {
  hourly: [
    {
      dt: number
      temp: number
      feels_like: number
      pressure: number
      humidity: number
      dew_point: number
      clouds: number
      visibility: number
      wind_speed: number
      wind_deg: number
      weather: [
        {
          id: number
          main: string
          description: string
          icon: string
        }
      ]
      pop: number
      rain: {
        '1h': number
      }
    }
  ]

  daily: [
    {
      dt: number
      sunrise: number
      sunset: number
      temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
      }
      feels_like: {
        day: number
        night: number
        eve: number
        morn: number
      }
      pressure: number
      humidity: number
      dew_point: number
      wind_speed: number
      wind_deg: number
      weather: [
        {
          id: number
          main: string
          description: string
          icon: string
        }
      ]
      clouds: number
      pop: number
      rain: number
      uvi: number
    }
  ]
}

declare type WeatherState = {
  loading?: boolean
  error?: Error | null
  requestTime?: number

  forecastRequestTime?: number
  forecastError?: Error | null
  forecastRequestTime?: number

  [key: string]: any
} & Partial<WeatherResponse> &
  Partial<ForecastResponse>

declare type CitiesWeatherState = {
  [key: string]: WeatherState
}

declare type WeatherAction = {
  type: string
  weather?: WeatherResponse
  city?: string
  error?: Error
}

declare type ListCities = {
  results: { [key: string]: { title: string }[] }
  isLoading: boolean
}

declare type ReduxState = {
  weatherByCity: CitiesWeatherState
  weatherByLocation: WeatherState
  searchCity: ListCities
}
