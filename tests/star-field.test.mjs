import assert from 'node:assert/strict'
import test from 'node:test'

let starField = {}

try {
  starField = await import('../src/lib/star-field.mjs')
} catch {}

test('createStarField produces varied stars within the viewport', () => {
  assert.equal(typeof starField.createStarField, 'function')

  let value = 0
  const stars = starField.createStarField(12, () => (value = (value + 0.137) % 1))

  assert.equal(stars.length, 12)
  assert.ok(new Set(stars.map(({ left, top }) => `${left}:${top}`)).size > 8)
  assert.ok(stars.every(({ left, top, size, opacity }) => left >= 0 && left <= 100 && top >= 0 && top <= 100 && size >= 1 && size <= 3 && opacity >= 0.25 && opacity <= 1))
})
