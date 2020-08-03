import { combineReducers } from 'redux'
import weatherByCity from './weatherByCity'
import weatherByLocation from './weatherByLocation'
import searchCity from './searchCity'

export default combineReducers({ weatherByCity, weatherByLocation, searchCity })
