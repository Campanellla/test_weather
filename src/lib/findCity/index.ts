import cityList from './city.list.json'
import _ from 'lodash'

type CityList = { name: string }[]

const findCity = (name) => {
  const re = new RegExp(_.escapeRegExp(name), 'i')
  const isMatch = (result) => re.test(result.name)
  const _results = _.filter(cityList as CityList, isMatch) as CityList

  const results: { title: string }[] = []

  const item = _results.find(
    ({ name: _name }) => _name.toLowerCase() === name.toLowerCase()
  )

  if (item) results.push({ title: item.name })

  for (let i = 0; i < _results.length; i++) {
    if (results.length === 10) break

    if (!results.find((r) => r.title === _results[i].name)) {
      results.push({ title: _results[i].name })
    }
  }

  return results
}

export default findCity
