import React, { Component } from 'react'
import _ from 'lodash'

import { getCitiesList } from 'src/actions/getCitiesList'

import { Search, SearchProps } from 'semantic-ui-react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import type { ListCities } from 'src/store/reducers/searchCity'

const popularCities = ['London', 'Odesa', 'Kyiv']

const StyledSearch = styled(Search)`
  display: grid;
  padding: 1rem;

  &&& > .results {
    position: initial;
  }
`

type CityName = { title: string }

type Props = {
  onSelect?: (name: string) => any
  isLoading: boolean
  results: { [key: string]: { title: string }[] }
  getCitiesList: typeof getCitiesList
}

type State = {
  value: string
}

const initialState: State = {
  value: '',
}

class SearchCity extends Component<Props, State> {
  state = initialState

  handleResultSelect = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    { result }: { result: CityName }
  ) => {
    this.props.onSelect?.(result?.title)

    this.setState({ value: result.title })
  }

  handleSearchChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    { value }: SearchProps
  ) => {
    if (value == null || value.length < 1) {
      return this.setState(initialState)
    }

    this.setState({ value })
    this.props.getCitiesList(value)
  }

  render() {
    const { value } = this.state

    return (
      <>
        <StyledSearch
          fluid
          showNoResults={!this.props.isLoading}
          selectFirstResult
          loading={this.props.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={this.props.results[value] || []}
          value={value}
        />
        <div>
          <div>Popular:</div>
          {popularCities.map((city, key) => (
            <div key={key} onClick={() => this.props.onSelect?.(city)}>
              {city}
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: { searchCity: ListCities }) => {
  return {
    results: state.searchCity.results,
    isLoading: state.searchCity.isLoading,
  }
}

export default connect(mapStateToProps, { getCitiesList })(SearchCity)
