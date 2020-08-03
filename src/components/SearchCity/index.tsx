import React, { Component } from 'react'
import _ from 'lodash'

import { getCitiesList } from 'src/actions/getCitiesList'

import { Search, SearchProps } from 'semantic-ui-react'
import { connect } from 'react-redux'

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
    this.props.onSelect?.(result.title)

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
      <Search
        selectFirstResult
        loading={this.props.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={this.props.results[value]}
        value={value}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.searchCity.results,
    isLoading: state.searchCity.isLoading,
  }
}

export default connect(mapStateToProps, { getCitiesList })(SearchCity)
