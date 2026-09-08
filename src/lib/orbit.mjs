export function stepIndex(index, direction, count) {
  if (count < 1) return 0
  return (index + Math.sign(direction) + count) % count
}

export function getSwipeDirection(startY, endY, threshold = 48) {
  const distance = endY - startY
  return Math.abs(distance) < threshold ? 0 : distance < 0 ? 1 : -1
}

export function getOrbitOffset(index, activeIndex, count) {
  let offset = index - activeIndex
  const halfway = count / 2

  if (offset > halfway) offset -= count
  if (offset < -halfway) offset += count

  return offset
}

export function isOrbitVisible(index, activeIndex, count) {
  return count > 0 && Math.abs(getOrbitOffset(index, activeIndex, count)) <= 2
}
