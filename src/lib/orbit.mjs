export function stepIndex(index, direction, count) {
  if (count < 1) return 0
  return (index + Math.sign(direction) + count) % count
}

export function getSwipeDirection(startY, endY, threshold = 48) {
  const distance = endY - startY
  return Math.abs(distance) < threshold ? 0 : distance < 0 ? 1 : -1
}

export function installEarlyIntentCapture(target) {
  let direction = 0
  let pointerStartY = null
  const owner = target.defaultView || target
  const hasShell = () => owner.location?.pathname === '/' && target.querySelector('.portfolio-shell')
  const stop = (event) => {
    event.preventDefault?.()
    event.stopImmediatePropagation?.()
  }
  const onWheel = (event) => {
    if (!hasShell() || Math.abs(event.deltaY) + Math.abs(event.deltaX) < 18) return
    stop(event)
    if (!direction) direction = event.deltaY + event.deltaX > 0 ? 1 : -1
  }
  const onPointerDown = (event) => {
    if (hasShell()) pointerStartY = event.clientY
  }
  const onPointerUp = (event) => {
    if (!hasShell() || pointerStartY === null) return
    const distance = event.clientY - pointerStartY
    pointerStartY = null
    if (Math.abs(distance) < 48) return
    stop(event)
    if (!direction) direction = distance < 0 ? 1 : -1
  }

  target.addEventListener('wheel', onWheel, { capture: true, passive: false })
  target.addEventListener('pointerdown', onPointerDown, true)
  target.addEventListener('pointerup', onPointerUp, true)

  const handle = {
    consume() {
      const queued = direction
      direction = 0
      return queued
    },
    cleanup() {
      target.removeEventListener('wheel', onWheel, { capture: true })
      target.removeEventListener('pointerdown', onPointerDown, true)
      target.removeEventListener('pointerup', onPointerUp, true)
      if (owner.__portfolioEarlyIntent === handle) delete owner.__portfolioEarlyIntent
    },
  }

  owner.__portfolioEarlyIntent = handle
  return handle
}

export const earlyIntentScript = `(${installEarlyIntentCapture.toString()})(document)`

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
