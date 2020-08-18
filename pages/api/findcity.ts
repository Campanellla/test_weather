import findCity from 'src/lib/findCity'

export default (req, res) => {
  try {
    const city = req.query.city

    if (city?.length) {
      const cities = findCity(city)

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(cities))
    } else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({}))
    }
    return
  } catch (e) {
    console.log({ error: e, log: 'error in findcities api' })
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify([]))
}
