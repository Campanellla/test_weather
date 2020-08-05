import React from 'react'
import { Image, Placeholder } from 'semantic-ui-react'

import styled from 'styled-components'
import getDayOfWeek from 'src/lib/getDayOfWeek'

const Forecast = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  grid-area: Forecast;
`

const HourlyForecaset = styled.div`
  display: grid;
  overflow: auto;
  grid-auto-flow: column;

  border-top: 1px black solid;
  border-bottom: 1px black solid;

  &::-webkit-scrollbar {
    display: none;
  }
`

const DailyForecastItems = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  background: rgba(255, 255, 255, 0.25);
  padding: 0.5rem 1rem;
`

const WeatherForecast: React.FunctionComponent<{ weather: WeatherState }> = ({
  weather,
}) => (
  <Forecast>
    <HourlyForecaset>
      {weather?.hourly?.map(({ temp, dt, weather }, i: number) => (
        <div
          style={{
            padding: '0.5em',
            whiteSpace: 'nowrap',
            display: 'grid',
            justifyItems: 'center',
          }}
          key={i}
        >
          <div style={{ textAlign: 'center' }}>
            {new Date(dt * 1000).toLocaleTimeString(undefined, {
              hour12: true,
              hour: 'numeric',
            })}
          </div>
          <Image
            style={{ height: '2rem', alignSelf: 'center' }}
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            inline
          />
          <div>{Math.round(temp - 273.15)} ˚C</div>
        </div>
      ))}
    </HourlyForecaset>

    <div>
      {weather?.daily?.map(({ temp, dt, weather }, index: number) => (
        <DailyForecastItems key={index}>
          <div>{index === 0 ? 'Today' : getDayOfWeek(dt)}</div>
          <Image
            style={{ height: '2rem' }}
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            inline
          />
          <div>{Math.round(temp.day - 273.15)} ˚C</div>
          <div>
            {Math.round(temp.min - 273.15)} ˚C / {Math.round(temp.max - 273.15)}{' '}
            ˚C
          </div>
        </DailyForecastItems>
      ))}
    </div>
  </Forecast>
)

export default WeatherForecast

export const WeatherForecastSkeleton = () => {
  const hourly = new Array(28).fill(null)
  const daily = new Array(7).fill(null)

  return (
    <Forecast>
      <HourlyForecaset style={{ display: 'flex', justifyContent: 'center' }}>
        {hourly.map((_, i) => (
          <div style={{ padding: '1rem' }} key={i}>
            <Placeholder style={{ height: '5rem', width: '3rem' }} />
          </div>
        ))}
      </HourlyForecaset>

      <div>
        {daily?.map((_, index) => {
          return (
            <DailyForecastItems
              style={{ display: 'flex', justifyContent: 'center' }}
              key={index}
            >
              <Placeholder style={{ height: '1.5em', width: '100%' }} />
            </DailyForecastItems>
          )
        })}
      </div>
    </Forecast>
  )
}
