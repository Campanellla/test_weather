import cityList from './city.list.json'
import _ from 'lodash'

const findCity = (name) => {
  const re = new RegExp(_.escapeRegExp(name), 'i')
  const isMatch = (result) => re.test(result.name)
  const _results = _.filter(cityList, isMatch)

  const results = []

  for (let i = 0; i < _results.length; i++) {
    if (results.length === 9) break

    if (!results.find((r) => r.title === _results[i].name)) {
      console.log(results, _results[i].name)

      results.push({ title: _results[i].name })
    }
  }

  return results
}

export default findCity
