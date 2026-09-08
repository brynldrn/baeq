export function stepIndex(index, direction, count) {
  if (count < 1) return 0
  return (index + Math.sign(direction) + count) % count
}

export function getSwipeDirection(startY, endY, threshold = 48) {
  const distance = endY - startY
  return Math.abs(distance) < threshold ? 0 : distance < 0 ? 1 : -1
}

export function getWheelDirection({ deltaX = 0, deltaY = 0, deltaMode = 0, timeStamp }, accumulator = {}, threshold = 18) {
  const timestamp = Number(timeStamp)
  const previousTimestamp = Number(accumulator.timeStamp)
  if (Number.isFinite(timestamp) && Number.isFinite(previousTimestamp) && (timestamp < previousTimestamp || timestamp - previousTimestamp > 160)) {
    accumulator.value = 0
    accumulator.direction = 0
  }
  if (Number.isFinite(timestamp)) accumulator.timeStamp = timestamp

  const scale = deltaMode === 1 ? 18 : deltaMode === 2 ? 100 : 1
  const x = (Number(deltaX) || 0) * scale
  const y = (Number(deltaY) || 0) * scale
  const dominant = Math.abs(y) >= Math.abs(x) ? y : x
  if (!dominant) return 0

  const direction = Math.sign(dominant)
  if (deltaMode !== 0) {
    accumulator.value = 0
    accumulator.direction = 0
    return direction
  }

  if (accumulator.direction && accumulator.direction !== direction) accumulator.value = 0
  accumulator.direction = direction
  accumulator.value = (Number(accumulator.value) || 0) + dominant
  if (Math.abs(accumulator.value) < threshold) return 0

  accumulator.value = 0
  accumulator.direction = 0
  return direction
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
  const wheelAccumulator = {}
  const getDirection = ({ deltaX = 0, deltaY = 0, deltaMode = 0, timeStamp }) => {
    const timestamp = Number(timeStamp)
    const previousTimestamp = Number(wheelAccumulator.timeStamp)
    if (Number.isFinite(timestamp) && Number.isFinite(previousTimestamp) && (timestamp < previousTimestamp || timestamp - previousTimestamp > 160)) {
      wheelAccumulator.value = 0
      wheelAccumulator.direction = 0
    }
    if (Number.isFinite(timestamp)) wheelAccumulator.timeStamp = timestamp

    const scale = deltaMode === 1 ? 18 : deltaMode === 2 ? 100 : 1
    const x = (Number(deltaX) || 0) * scale
    const y = (Number(deltaY) || 0) * scale
    const dominant = Math.abs(y) >= Math.abs(x) ? y : x
    if (!dominant) return 0

    const wheelDirection = Math.sign(dominant)
    if (deltaMode !== 0) {
      wheelAccumulator.value = 0
      wheelAccumulator.direction = 0
      return wheelDirection
    }

    if (wheelAccumulator.direction && wheelAccumulator.direction !== wheelDirection) wheelAccumulator.value = 0
    wheelAccumulator.direction = wheelDirection
    wheelAccumulator.value = (Number(wheelAccumulator.value) || 0) + dominant
    if (Math.abs(wheelAccumulator.value) < 18) return 0

    wheelAccumulator.value = 0
    wheelAccumulator.direction = 0
    return wheelDirection
  }
  const onWheel = (event) => {
    const wheelDirection = getDirection(event)
    if (!hasShell() || !wheelDirection) return
    stop(event)
    if (!direction) direction = wheelDirection
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
