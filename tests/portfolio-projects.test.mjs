import assert from 'node:assert/strict'
import test from 'node:test'

let portfolio = {}

try {
  portfolio = await import('../src/lib/portfolio-projects.mjs')
} catch {}

test('mergeFeaturedProjects leads with the approved five and keeps the full archive', () => {
  assert.equal(typeof portfolio.mergeFeaturedProjects, 'function')

  const projects = portfolio.mergeFeaturedProjects([
    { id: 'whoop-cms', name: 'Whoop', imageCap: { url: 'https://example.com/whoop.jpg' }, gallery: [] },
    { id: 'rally-cms', name: 'Rally', imageCap: { url: 'https://example.com/rally.jpg' }, gallery: [] },
    { id: 'archive-one', name: 'Archive One', imageCap: null, gallery: [] },
    { id: 'archive-two', name: 'Archive Two', imageCap: null, gallery: [] },
  ])

  assert.deepEqual(projects.map(({ name }) => name), [
    'Daycare Management Platform',
    'Mikon Web App v2',
    'WHOOP Year in Review',
    'Rally.io',
    'Internal Productivity Extension',
    'Archive One',
    'Archive Two',
  ])
  assert.equal(projects[2].imageCap.url, 'https://example.com/whoop.jpg')
  assert.equal(projects[3].imageCap.url, 'https://example.com/rally.jpg')
})
