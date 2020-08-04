export const getForecast = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
  )

  const parsedResponse = await response.json()

  const { hourly, daily } = parsedResponse

  return { hourly, daily }
}
