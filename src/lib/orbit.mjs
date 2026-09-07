export function stepIndex(index, direction, count) {
  if (count < 1) return 0
  return Math.min(count - 1, Math.max(0, index + Math.sign(direction)))
}

export function getOrbitOffset(index, activeIndex, count) {
  let offset = index - activeIndex
  const halfway = count / 2

  if (offset > halfway) offset -= count
  if (offset < -halfway) offset += count

  return offset
}
