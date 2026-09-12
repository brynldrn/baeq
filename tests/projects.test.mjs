import assert from 'node:assert/strict'
import test from 'node:test'

let projects = {}

try {
  projects = await import('../src/lib/projects.mjs')
} catch {}

test('normalizeProject supplies safe optional values', () => {
  assert.equal(typeof projects.normalizeProject, 'function')

  assert.deepEqual(projects.normalizeProject({
    id: 'project-1',
    name: 'Project One',
    year: 2026,
    position: 'Senior Software Engineer',
    imageCap: { url: 'https://media.graphassets.com/example' },
  }), {
    id: 'project-1',
    name: 'Project One',
    year: '2026',
    position: 'Senior Software Engineer',
    url: '',
    longMd: '',
    imageCap: { url: 'https://media.graphassets.com/example' },
    gallery: [],
  })
})

test('normalizeProject rejects malformed CMS data', () => {
  assert.equal(typeof projects.normalizeProject, 'function')
  assert.throws(() => projects.normalizeProject({ name: 'Missing ID' }), /project id/i)
})
