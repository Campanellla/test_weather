import React, { ReactNode } from 'react'
import Router from 'next/router'

import { getCityWeather } from 'src/actions'
import { connect } from 'react-redux'

import Weather, { WeatherSkeleton } from 'src/components/Weather'
import WeatherForecast from 'src/components/Forecast'

import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

import ErrorContainer from 'src/components/ErrorContainer'

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
  getCityWeather: typeof getCityWeather
  weatherByCity: WeatherState
}

const CityPage: React.FunctionComponent<Props> = ({
  name,
  getCityWeather,
  weatherByCity,
}) => {
  React.useEffect(() => {
    getCityWeather(name)
  }, [])

  const weather = weatherByCity[name]

  if (weather?.error) {
    return <ErrorContainer message={weather.error.message} />
  }

  if (!weather || weather?.loading || weather.loading === undefined) {
    return <WeatherSkeleton name={name} />
  }

  return (
    <StyledCityPage>
      <Weather weather={weather} />
      <WeatherForecast weather={weather} />
      <ReturnButton />
    </StyledCityPage>
  )
}

const mapStateToProps = (state: ReduxState) => {
  return { weatherByCity: state.weatherByCity }
}

export default connect(mapStateToProps, {
  getCityWeather,
})(CityPage)
