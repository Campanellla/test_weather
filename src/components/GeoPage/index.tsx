import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import { getLocationWeather } from 'src/actions'

import Weather, { WeatherSkeleton } from 'src/components/Weather'

import { Button, Search } from 'semantic-ui-react'
import styled from 'styled-components'

import SearchCity from 'src/components/SearchCity'

const CityPageButton = () => (
  <SearchCity onSelect={(name) => Router.push(`/city?name=${name}`)} />
)

const GeoPageContainer = styled.div`
  font-size: 20px;
`

const GeoPage = ({ weather, getLocationWeather }) => {
  React.useEffect(() => {
    getLocationWeather()
  }, [])

  if (!weather || weather.loading) {
    return (
      <GeoPageContainer>
        <WeatherSkeleton />
        <CityPageButton />
      </GeoPageContainer>
    )
  }

  return (
    <GeoPageContainer>
      <Weather weather={weather} />
      <CityPageButton />
    </GeoPageContainer>
  )
}

const mapStateToProps = (state) => {
  return { weather: state.weatherByLocation }
}

export default connect(mapStateToProps, { getLocationWeather })(GeoPage)
