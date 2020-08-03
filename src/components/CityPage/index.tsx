import React from 'react'
import Router from 'next/router'

import { getCityWeather } from 'src/actions'
import { connect } from 'react-redux'

import Weather, { WeatherSkeleton } from 'src/components/Weather'

import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const ReturnButton = () => (
  <Button
    onClick={() => {
      Router.push('/')
    }}
  >
    Return
  </Button>
)

const CityPage = ({ name, getCityWeather, weatherByCity }) => {
  React.useEffect(() => {
    getCityWeather(name)
  }, [])

  const weather = weatherByCity[name]

  if (!weather || weather.loading) {
    return <WeatherSkeleton name={name} />
  }

  return (
    <div>
      <Weather weather={weather} />
      <ReturnButton />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { weatherByCity: state.weatherByCity }
}

export default connect(mapStateToProps, { getCityWeather })(CityPage)
