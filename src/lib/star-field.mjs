export function createStarField(count, random = Math.random) {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: random() * 100,
    top: random() * 100,
    size: 1 + random() * 2,
    opacity: 0.25 + random() * 0.75,
    delay: random() * -6,
  }))
}
