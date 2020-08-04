import 'semantic-ui-css/semantic.min.css'
import React from 'react'

import { Provider } from 'react-redux'
import store from 'src/store'

import { createGlobalStyle } from 'styled-components'

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

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
