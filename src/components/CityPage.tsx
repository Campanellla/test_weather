import React from 'react'
import Router from 'next/router'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

import Weather, { WeatherSkeleton } from 'src/components/Weather'
import WeatherForecast from 'src/components/Forecast'
import ErrorContainer from 'src/components/ErrorContainer'

import { getWeatherByCity } from 'src/graphql'

const StyledCityPage = styled.div`
  display: grid;
  grid-template-areas: 'Weather' 'Forecast' 'Return';

  @media (min-width: 750px) {
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'Weather Forecast'
      'Return Forecast';

    width: 100%;
    gap: 2rem;
    padding: 2rem 2rem;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    justify-self: center;
  }
`

const ReturnButton = () => (
  <Button
    style={{ gridrea: 'Return', margin: 0 }}
    onClick={() => {
      Router.push('/')
    }}
  >
    Return
  </Button>
)

type Props = {
  name: string
}

const CityPage: React.FC<Props> = ({ name }) => {
  const { loading, data, error } = useQuery(getWeatherByCity, {
    variables: { q: name },
  })

  if (loading) {
    return <WeatherSkeleton name={name} />
  }

  if (error) {
    return <ErrorContainer message={error.message} />
  }

  const weather = data.getWeatherByCity

  if (!weather) {
    return <ErrorContainer message={'data not received'} />
  }

  return (
    <StyledCityPage>
      <Weather weather={weather} />
      <WeatherForecast coord={weather.coord} />
      <ReturnButton />
    </StyledCityPage>
  )
}

export default CityPage
