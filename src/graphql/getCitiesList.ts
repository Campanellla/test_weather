import { gql } from '@apollo/client'

export const getCitiesList = gql`
  query getCitiesList($city: City!) {
    getCitiesList(city: $city)
      @rest(type: "Cities", path: "/findcity?{args}", endpoint: "local") {
      title
    }
  }
`
