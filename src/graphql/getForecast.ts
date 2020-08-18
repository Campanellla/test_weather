import { gql } from '@apollo/client'

export const getForecast = gql`
  query getForecast($lat: Latitude!, $lon: Longitude!) {
    getForecast(lat: $lat, lon: $lon)
      @rest(type: "Forecast", path: "data/2.5/onecall?{args}&exclude=current,minutely&appid=${process.env.NEXT_PUBLIC_WEATHER_API}") {
      id
      
      hourly @type(name: "Hourly"){
        dt
        temp
        feels_like
        pressure
        humidity
        dew_point
        clouds
        visibility
        wind_speed
        wind_deg
        pop
        weather @type(name: "WeatherDesc"){
          id
          main
          description
          icon
        }
      }

      daily @type(name: "Daily"){
        dt
        sunrise
        sunset
        pressure
        humidity
        dew_point
        wind_speed
        wind_deg
        temp{
          day
          min
          max
          night
          eve
          morn
        }
        feels_like{
          day
          night
          eve
          morn
        }
        weather@type(name: "WeatherDesc"){
          id
          main
          description
          icon
        }
        clouds
        pop
        rain
        uvi
      }
    }
  }
`
