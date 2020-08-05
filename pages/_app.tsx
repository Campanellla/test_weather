import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

import store from 'src/store'

import type { NextComponentType } from 'next'

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
      <Head>
        <title>Weather</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
