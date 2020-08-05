import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from './reducers'

const loggerMiddleware = createLogger()

const middlewares: any[] = [thunkMiddleware]

if (process.env.development) {
  middlewares.push(loggerMiddleware)
}

export default createStore(reducers, applyMiddleware(...middlewares))
