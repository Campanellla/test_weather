import React from 'react'
import { NextPageContext } from 'next'

import CityPage from 'src/components/CityPage'

class City extends React.Component {
  static async getInitialProps({ query: { name } }: NextPageContext) {
    return { name }
  }

  render = () => <CityPage {...this.props} />
}

export default City
