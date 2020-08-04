import React from 'react'
import styled from 'styled-components'
import { Image, Placeholder } from 'semantic-ui-react'

import degToCompass from 'src/lib/degToCompass'
import { GridListContainer, GridItem } from './GridList'

const WeatherContainer = styled.div`
  grid-area: Weather;
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

const Weather = ({ weather }) => {
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
    </WeatherContainer>
  )
}

export default Weather

type WeatherSkeletonProps = { name?: string }

export const WeatherSkeleton: React.FunctionComponent<WeatherSkeletonProps> = ({
  name = '',
}) => {
  return (
    <WeatherContainer>
      <Location style={{ display: 'flex', justifyContent: 'center' }}>
        {name ? (
          name
        ) : (
          <Placeholder style={{ height: '1.25em', width: '100%' }} />
        )}
      </Location>
      <WeatherCondition
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Placeholder style={{ height: '1.25em', width: '100%' }} />
      </WeatherCondition>

      <Temperature>
        <Placeholder style={{ height: '1.25em', width: '100%' }} />
      </Temperature>

      <GridListContainer>
        <GridItem label={'Sunrise'} placeholder />
        <GridItem label={'Sunset'} placeholder />

        <GridItem label={'Pressure'} placeholder />
        <GridItem label={'Humidity'} placeholder />

        <GridItem label={'Feels like'} placeholder />
        <GridItem label={'Wind'} placeholder />
      </GridListContainer>
    </WeatherContainer>
  )
}
