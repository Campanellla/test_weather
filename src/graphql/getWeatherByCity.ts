import { gql } from '@apollo/client'

export const getWeatherByCity = gql`
  query getWeatherByCity($q: City!) {
    getWeatherByCity(q: $q)
      @rest(type: "Weather", path: "data/2.5/weather?{args}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}") {
      name
      visibility
      base
      timezone
      cod
      dt
      coord {
        lon
        lat
      }
      clouds {
        all
      }
      wind {
        speed
        deg
      }
      main {
        feels_like
        humidity
        pressure
        temp
        temp_max
        temp_min
      }
      sys @type(name: "Sys") {
        id
        country
        sunrise
        sunset
        type
      }
      weather @type(name: "WeatherDesc") {
        id
        description
        icon
        main
      }
    }
  }
`
