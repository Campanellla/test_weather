import React from 'react'
import Router from 'next/router'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useLazyQuery, useQuery } from '@apollo/client'

import Weather, { WeatherSkeleton } from 'src/components/Weather'
import SearchCity from 'src/components/SearchCity'
import WeatherForecast, {
  WeatherForecastSkeleton,
} from 'src/components/Forecast'
import ErrorContainer from 'src/components/ErrorContainer'

import { getWeatherByLocation } from 'src/graphql'
import getPosition from 'src/lib/getPosition'
import { truncate } from 'lodash'

const AskLocationButton = styled(Button)`
  grid-area: Geo;
`

const CityPageButton = () => (
  <SearchCity onSelect={(name) => Router.push(`/city?name=${name}`)} />
)

const GeoPageContainer = styled.div`
  display: grid;
  grid-template-areas: 'Geo' 'Weather' 'Forecast' 'Search';

  font-size: 20px;

  @media (min-width: 750px) {
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'Geo Forecast'
      'Weather Forecast'
      'Search Forecast';

    width: 100%;
    gap: 2rem;
    padding: 2rem 2rem;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    justify-self: center;
  }
`

let storedCoords: {
  lat: number
  lon: number
} | null = null

const GeoPage: React.FC = () => {
  const [prompt, setPrompt] = React.useState(false)
  const [coords, setCoords] = React.useState<{
    lat: number
    lon: number
  } | null>(storedCoords)

  const { loading, data, error } = useQuery(getWeatherByLocation, {
    skip: !coords,
    variables: coords,
  })

  const runRequest = async () => {
    const coords = await getPosition()

    storedCoords = { lat: coords.latitude, lon: coords.longitude }
    setCoords(storedCoords)
  }

  React.useEffect(() => {
    try {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state == 'granted') {
            runRequest()
          } else if (result.state == 'prompt') {
            setPrompt(true)
          } else {
            setPrompt(true)
          }
        })
    } catch (e) {
      runRequest()
      setPrompt(true)
    }
  }, [])

  if (error) {
    return <ErrorContainer message={error.message} />
  }

  const weather = data?.getWeatherByLocation

  if (!weather || loading) {
    return (
      <GeoPageContainer>
        {prompt ? (
          <AskLocationButton
            onClick={() => {
              setPrompt(false)
              runRequest()
            }}
          >
            Accept location permission
          </AskLocationButton>
        ) : null}

        <WeatherSkeleton />
        <CityPageButton />
        <WeatherForecastSkeleton />
      </GeoPageContainer>
    )
  }

  return (
    <GeoPageContainer>
      <Weather weather={weather as WeatherResponse} />
      <WeatherForecast coord={weather.coord} />
      <CityPageButton />
    </GeoPageContainer>
  )
}

export default GeoPage
