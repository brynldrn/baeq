import assert from 'node:assert/strict'
import test from 'node:test'

let portfolio = {}

try {
  portfolio = await import('../src/lib/portfolio-projects.mjs')
} catch {}

test('mergeFeaturedProjects leads with the approved curation and keeps the full archive', () => {
  assert.equal(typeof portfolio.mergeFeaturedProjects, 'function')

  const projects = portfolio.mergeFeaturedProjects([
    { id: 'whoop-cms', name: 'Whoop', imageCap: { url: 'https://example.com/whoop.jpg' }, gallery: [] },
    { id: 'rally-cms', name: 'Rally', imageCap: { url: 'https://example.com/rally.jpg' }, gallery: [] },
    {
      id: 'cmts86d2z7g8v07zypukbl048',
      name: 'Bry & Shai Wedding Website',
      year: '2025',
      position: 'Husband',
      url: 'https://bry-shai.vercel.app',
      imageCap: { url: 'https://example.com/bry-shai.jpg' },
      gallery: [],
    },
    { id: 'archive-one', name: 'Archive One', imageCap: null, gallery: [] },
    { id: 'archive-two', name: 'Archive Two', imageCap: null, gallery: [] },
  ])

  assert.deepEqual(projects.map(({ name }) => name), [
    'Daycare Management Platform',
    'Mikon Web App v2',
    'Bry & Shai Wedding Website',
    'WHOOP Year in Review',
    'Rally.io',
    'Internal Productivity Extension',
    'Archive One',
    'Archive Two',
  ])
  assert.equal(projects[2].id, 'cmts86d2z7g8v07zypukbl048')
  assert.equal(projects.filter(({ id }) => id === 'cmts86d2z7g8v07zypukbl048').length, 1)
  assert.equal(projects[2].url, 'https://bry-shai.vercel.app')
  assert.equal(projects[2].imageCap.url, 'https://example.com/bry-shai.jpg')
  assert.equal(projects[3].imageCap.url, 'https://example.com/whoop.jpg')
  assert.equal(projects[4].imageCap.url, 'https://example.com/rally.jpg')
})

test('mergeFeaturedProjects keeps the wedding slot usable without its CMS record', () => {
  let projects
  assert.doesNotThrow(() => {
    projects = portfolio.mergeFeaturedProjects([])
  })

  assert.equal(projects[2].name, 'Bry & Shai Wedding Website')
  assert.equal(projects[2].year, '2025')
  assert.equal(projects[2].position, 'Husband')
  assert.equal(projects[2].summary, 'A personal wedding website bringing the story, details, and celebration together in one place.')
  assert.equal(projects[2].longMd, projects[2].summary)
  assert.equal(projects[2].imageCap, null)
})
