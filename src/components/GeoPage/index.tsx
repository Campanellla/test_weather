import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { getLocationWeather } from 'src/actions'
import Weather, { WeatherSkeleton } from 'src/components/Weather'
import SearchCity from 'src/components/SearchCity'
import WeatherForecast, {
  WeatherForecastSkeleton,
} from 'src/components/Forecast'
import ErrorContainer from 'src/components/ErrorContainer'

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

const GeoPage = ({ weather, getLocationWeather }) => {
  const [prompt, setPrompt] = React.useState(false)

  React.useEffect(() => {
    try {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state == 'granted') {
            getLocationWeather()
          } else if (result.state == 'prompt') {
            setPrompt(true)
          } else {
            setPrompt(true)
          }
        })
    } catch (e) {
      getLocationWeather()
      setPrompt(true)
    }
  }, [])

  if (weather?.error) {
    return <ErrorContainer message={weather.error.message} />
  }

  if (!weather || weather.loading === true || weather.loading === undefined) {
    return (
      <GeoPageContainer>
        {prompt ? (
          <AskLocationButton
            onClick={() => {
              setPrompt(false)
              getLocationWeather()
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
      <Weather weather={weather} />
      <WeatherForecast weather={weather} />
      <CityPageButton />
    </GeoPageContainer>
  )
}

const mapStateToProps = (state) => {
  return { weather: state.weatherByLocation }
}

export default connect(mapStateToProps, { getLocationWeather })(GeoPage)
