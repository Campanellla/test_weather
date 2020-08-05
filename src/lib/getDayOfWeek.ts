const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednessday',
  'Thursday',
  'Friday',
  'Saturday',
]

export default (dt: number) => {
  return days[new Date(dt * 1000).getDay()]
}
