import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import store from 'src/store'

import { NextComponentType } from 'next'

const GlobalStyles = createGlobalStyle`
  body{
    font-size: 20px;
    line-height: normal;
    background-color: lightblue;
  }
  
  #__next{
    display: grid;
  }
`

type MyAppProps = {
  Component: NextComponentType
  pageProps: any
}

const MyApp: React.FunctionComponent<MyAppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
