import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import { RestLink } from 'apollo-link-rest'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import type { NextComponentType } from 'next'

// Set `RestLink` with your endpoint
const restLink = new RestLink({
  uri: 'https://api.openweathermap.org/',
  endpoints: { local: '/api' },
})

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
})

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
    <ApolloProvider client={client}>
      <Head>
        <title>Weather</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
