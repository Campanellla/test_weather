import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Search, SearchProps, Button } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'

import { getCitiesList } from 'src/graphql/getCitiesList'

type CityName = { title: string }

const StyledSearch = styled(Search)`
  display: grid;
  padding: 1rem;

  &&& > .results {
    position: initial;
  }
`

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

const popularCities = [
  'London',
  'Odesa',
  'Kyiv',
  'New York',
  'Moscow',
  'Amsterdam',
]

// Hook
function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

type Props = {
  onSelect: (city: string) => void
}

const SearchCity: React.FC<Props> = ({ onSelect }) => {
  const [value, setValue] = useState('')

  // from https://usehooks.com/useDebounce/
  const debounceSearch = useDebounce(value, 500)

  const { data, loading } = useQuery(getCitiesList, {
    skip: !debounceSearch,
    variables: {
      city: debounceSearch,
    },
  })

  const results = data?.getCitiesList?.length ? data.getCitiesList : []

  return (
    <SearchContainer>
      <StyledSearch
        fluid
        showNoResults={false}
        selectFirstResult
        loading={loading}
        onResultSelect={(
          e: React.MouseEvent<HTMLElement, MouseEvent>,
          { result }: { result: CityName }
        ) => {
          onSelect?.(result?.title)
          setValue(result.title)
        }}
        onSearchChange={(
          e: React.MouseEvent<HTMLElement, MouseEvent>,
          { value }: SearchProps
        ) => {
          if (value == null || value.length < 1) {
            return setValue('')
          }

          setValue(value)
        }}
        results={results}
        value={value}
      />
      <CityList>
        {popularCities.map((city, key) => (
          <Button
            key={key}
            onClick={() => onSelect?.(city)}
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

export default SearchCity
