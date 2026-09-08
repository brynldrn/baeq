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
