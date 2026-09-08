import assert from 'node:assert/strict'
import test from 'node:test'

let orbit = {}

try {
  orbit = await import('../src/lib/orbit.mjs')
} catch {}

test('stepIndex wraps around the project orbit', () => {
  assert.equal(typeof orbit.stepIndex, 'function')
  assert.equal(orbit.stepIndex(0, -1, 5), 4)
  assert.equal(orbit.stepIndex(0, 1, 5), 1)
  assert.equal(orbit.stepIndex(4, 1, 5), 0)
})

test('getOrbitOffset returns the shortest circular distance', () => {
  assert.equal(typeof orbit.getOrbitOffset, 'function')
  assert.equal(orbit.getOrbitOffset(4, 0, 5), -1)
  assert.equal(orbit.getOrbitOffset(0, 4, 5), 1)
})

test('keeps the five-card orbit window across wrap-around', () => {
  assert.equal(typeof orbit.isOrbitVisible, 'function')
  assert.equal(orbit.isOrbitVisible(0, 0, 5), true)
  assert.equal(orbit.isOrbitVisible(1, 0, 5), true)
  assert.equal(orbit.isOrbitVisible(2, 0, 5), true)
  assert.equal(orbit.isOrbitVisible(4, 0, 5), true)
  assert.equal(orbit.isOrbitVisible(3, 0, 5), true)
  assert.equal(orbit.isOrbitVisible(12, 14, 15), true)
  assert.equal(orbit.isOrbitVisible(1, 14, 15), true)
  assert.equal(orbit.isOrbitVisible(11, 14, 15), false)
  assert.equal(orbit.isOrbitVisible(2, 14, 15), false)
})

test('getSwipeDirection ignores taps and recognizes vertical swipes', () => {
  assert.equal(typeof orbit.getSwipeDirection, 'function')
  assert.equal(orbit.getSwipeDirection(500, 470), 0)
  assert.equal(orbit.getSwipeDirection(500, 420), 1)
  assert.equal(orbit.getSwipeDirection(420, 500), -1)
})

function createEventTarget(pathname = '/') {
  const listeners = new Map()
  return {
    shell: true,
    defaultView: { location: { pathname } },
    addEventListener(type, listener) {
      listeners.set(type, listener)
    },
    removeEventListener(type) {
      listeners.delete(type)
    },
    querySelector(selector) {
      return selector === '.portfolio-shell' && this.shell ? {} : null
    },
    dispatch(type, event) {
      listeners.get(type)?.(event)
    },
  }
}

test('early wheel intent is buffered once and stopped during hydration handoff', () => {
  assert.equal(typeof orbit.installEarlyIntentCapture, 'function')
  const target = createEventTarget()
  const capture = orbit.installEarlyIntentCapture(target)
  const event = {
    deltaY: 80,
    deltaX: 0,
    preventDefault() { this.prevented = true },
    stopImmediatePropagation() { this.stopped = true },
  }

  target.dispatch('wheel', event)

  assert.equal(capture.consume(), 1)
  assert.equal(capture.consume(), 0)
  assert.equal(event.prevented, true)
  assert.equal(event.stopped, true)
})

test('early pointer intent buffers only vertical swipes beyond the threshold', () => {
  const target = createEventTarget()
  const capture = orbit.installEarlyIntentCapture(target)
  const tap = {
    clientY: 500,
    preventDefault() { this.prevented = true },
    stopImmediatePropagation() { this.stopped = true },
  }
  target.dispatch('pointerdown', tap)
  target.dispatch('pointerup', { ...tap, clientY: 470 })
  assert.equal(capture.consume(), 0)

  const swipe = {
    clientY: 500,
    preventDefault() { this.prevented = true },
    stopImmediatePropagation() { this.stopped = true },
  }
  target.dispatch('pointerdown', swipe)
  const swipeUp = { ...swipe, clientY: 420 }
  target.dispatch('pointerup', swipeUp)
  assert.equal(capture.consume(), 1)
  assert.equal(swipeUp.prevented, true)
  assert.equal(swipeUp.stopped, true)
})

test('early intent leaves routes without a portfolio shell alone', () => {
  const target = createEventTarget()
  target.shell = false
  const capture = orbit.installEarlyIntentCapture(target)
  const event = {
    deltaY: 80,
    deltaX: 0,
    preventDefault() { this.prevented = true },
    stopImmediatePropagation() { this.stopped = true },
  }

  target.dispatch('wheel', event)

  assert.equal(capture.consume(), 0)
  assert.equal(event.prevented, undefined)
  assert.equal(event.stopped, undefined)
})

test('early intent leaves project detail routes alone', () => {
  const target = createEventTarget('/projects/example')
  const capture = orbit.installEarlyIntentCapture(target)
  const event = {
    deltaY: 80,
    deltaX: 0,
    preventDefault() { this.prevented = true },
    stopImmediatePropagation() { this.stopped = true },
  }

  target.dispatch('wheel', event)

  assert.equal(capture.consume(), 0)
  assert.equal(event.prevented, undefined)
  assert.equal(event.stopped, undefined)
})
