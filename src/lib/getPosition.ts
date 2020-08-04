export default async () => {
  try {
    const { coords } = await new Promise<Position>((resolve) =>
      navigator?.geolocation.getCurrentPosition(resolve)
    )
    return coords
  } catch (e) {
    throw new Error('Unable to get position')
  }
}
