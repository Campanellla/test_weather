import styled from 'styled-components'

import { Icon, Image } from 'semantic-ui-react'

import degToCompass from 'src/lib/degToCompass'

import { GridListContainer, GridItem } from './GridList'

const WeatherContainer = styled.div`
  padding: 1rem 1rem;
`

const Location = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
`

const WeatherCondition = styled.div`
  opacity: 0.75;
  text-align: center;
  margin-top: 0.5rem;
`

const Temperature = styled.div`
  font-size: 5rem;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
`

const Forecast = styled.div``

const WeatherHeader = styled.div`
  display: grid;
  justify-content: center;
`

const Weather = ({ weather }) => {
  console.log(weather)

  const weatherDate = new Date(weather.dt * 1000).toString()
  const temperature = Math.round(weather.main.temp - 273.15)
  const location = weather.name
  const feelsLike = Math.round(weather.main.feels_like - 273.15)
  const weatherDescription = weather?.weather?.[0]?.description
  const windSpeed = weather.wind.speed
  const windCompass = degToCompass(weather.wind.deg)
  const pressure = weather.main.pressure
  const humidity = weather.main.humidity
  const weatherIcon = weather?.weather?.[0]?.icon
  const sunrise = new Date(weather?.sys?.sunrise * 1000)
  const sunset = new Date(weather?.sys?.sunset * 1000)

  return (
    <WeatherContainer>
      <Location>{location}</Location>
      <WeatherCondition>{weatherDescription}</WeatherCondition>

      <Temperature>
        <Image
          style={{ height: '7.5rem' }}
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          inline
        />
        <span>{temperature} ˚C</span>
      </Temperature>

      <GridListContainer>
        <GridItem
          label={'Sunrise'}
          content={`${sunrise.getHours()}:${sunrise.getMinutes()}`}
        />
        <GridItem
          label={'Sunset'}
          content={`${sunset.getHours()}:${sunset.getMinutes()}`}
        />

        <GridItem label={'Pressure'} content={`${pressure} hPa`} />
        <GridItem label={'Humidity'} content={`${humidity} %`} />

        <GridItem label={'Feels like'} content={`${feelsLike} ˚C`} />
        <GridItem label={'Wind'} content={`${windSpeed} km/h ${windCompass}`} />
      </GridListContainer>

      <Forecast>
        <div>Forecast:</div>
        <div>Date 1</div>
        <div>Date 2</div>
        <div>Date 3</div>
      </Forecast>
    </WeatherContainer>
  )
}

export default Weather

type WeatherSkeletonProps = { name?: string }

export const WeatherSkeleton: React.FunctionComponent<WeatherSkeletonProps> = ({
  name = '',
}) => {
  return <div>Loading {name}</div>
}
