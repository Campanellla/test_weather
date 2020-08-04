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

declare type ForecastResponse = {}

declare type WeatherState = {
  loading?: boolean
  error?: Error | null
  requestTime?: number

  forecastRequestTime?: number
  forecastError?: Error | null
  forecastRequestTime?: number

  [key: string]: any
} & Partial<WeatherResponse>

declare type CitiesWeatherState = {
  [key: string]: WeatherState
}

declare type WeatherAction = {
  type: string
  weather?: WeatherResponse
  city?: string
  error?: Error
}
