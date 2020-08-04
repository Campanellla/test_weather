import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Search, SearchProps, Button } from 'semantic-ui-react'
import _ from 'lodash'

import type { ListCities } from 'src/store/reducers/searchCity'
import { getCitiesList } from 'src/actions/getCitiesList'

const popularCities = [
  'London',
  'Odesa',
  'Kyiv',
  'New York',
  'Moscow',
  'Amsterdam',
]

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
    //this.props.getCitiesList(value)
    this._handleSC()
  }

  _get = () => {
    this.props.getCitiesList(this.state.value)
  }

  _handleSC = _.debounce(this._get, 500, {
    trailing: true,
  })

  render() {
    const { value } = this.state

    return (
      <SearchContainer>
        <StyledSearch
          fluid
          showNoResults={false}
          selectFirstResult
          loading={this.props.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={this.props.results[value]}
          value={value}
        />
        <CityList>
          {popularCities.map((city, key) => (
            <Button
              key={key}
              onClick={() => this.props.onSelect?.(city)}
              inverted
              color="blue"
            >
              {city}
            </Button>
          ))}
        </CityList>
      </SearchContainer>
    )
  }
}

const CityList = styled.div`
  display: grid;
  grid-auto-rows: auto;
  gap: 0.25rem;

  &&&&& > button {
    font-size: 1.5rem;
    margin: 0;
    box-shadow: none !important;
    color: black;
  }
`

const SearchContainer = styled.div`
  grid-area: Search;
`

const mapStateToProps = (state: { searchCity: ListCities }) => {
  return {
    results: state.searchCity.results,
    isLoading: state.searchCity.isLoading,
  }
}

export default connect(mapStateToProps, { getCitiesList })(SearchCity)
