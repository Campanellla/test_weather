const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednessday',
  'thursday',
  'friday',
  'saturday',
]

export default (dt: number) => {
  return days[new Date(dt * 1000).getDay()]
}
