import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

let projects = {}

try {
  projects = await import('../src/lib/projects.mjs')
} catch {}

test('local project content is canonical and runtime APIs need no network', async () => {
  const dataPath = resolve('src/data/projects.json')
  assert.ok(existsSync(dataPath), 'src/data/projects.json should exist')

  const data = JSON.parse(readFileSync(dataPath, 'utf8'))
  assert.equal(data.length, 17)
  assert.equal(data[0].id, 'kitatrack')
  assert.equal(new Set(data.map(({ id }) => id)).size, data.length)
  assert.ok(data.every(({ id }) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)))

  const refs = data.flatMap(({ imageCap, siteLogo, gallery }) => [imageCap, siteLogo, ...gallery].filter(Boolean))
  const refUrls = new Set(refs.map(({ url }) => url))
  assert.equal(refUrls.size, 107)
  for (const { url } of refs) {
    assert.match(url, /^\/media\/projects\//)
    assert.ok(existsSync(resolve(`public${url}`)))
    assert.ok(statSync(resolve(`public${url}`)).size > 0)
  }

  const fileUrls = []
  const collectFiles = (directory, urlPrefix) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name)
      const url = `${urlPrefix}/${entry.name}`
      if (entry.isDirectory()) collectFiles(path, url)
      else fileUrls.push(url)
    }
  }
  collectFiles(resolve('public/media/projects'), '/media/projects')
  assert.equal(fileUrls.length, 107)
  assert.deepEqual(fileUrls.sort(), [...refUrls].sort())

  const kitaTrack = data.find(({ id }) => id === 'kitatrack')
  assert.deepEqual(kitaTrack.stack, ['Expo', 'SQLite', 'Supabase'])
  assert.equal(kitaTrack.year, '2026')
  assert.equal(kitaTrack.position, 'Creator & Developer')
  assert.equal(kitaTrack.url, 'https://kitatrack-ph.com')

  const originalFetch = globalThis.fetch
  globalThis.fetch = () => { throw new Error('network should not be used') }
  try {
    const loaded = await projects.getProjects()
    assert.equal(loaded.length, 17)
    assert.equal((await projects.getProject('kitatrack')).name, 'KitaTrack')
    assert.equal((await projects.getPortfolioProjects()).length, 17)
    assert.equal((await projects.getPortfolioProject('kitatrack')).id, 'kitatrack')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('normalizeProject supplies safe optional values', () => {
  assert.equal(typeof projects.normalizeProject, 'function')

  assert.deepEqual(projects.normalizeProject({
    id: 'project-1',
    name: 'Project One',
    year: 2026,
    position: 'Senior Software Engineer',
    imageCap: { url: '/media/projects/project-one/cover.png' },
  }), {
    id: 'project-1',
    name: 'Project One',
    year: '2026',
    position: 'Senior Software Engineer',
    url: '',
    summary: '',
    tech: '',
    stack: [],
    longMd: '',
    siteLogo: null,
    imageCap: { url: '/media/projects/project-one/cover.png' },
    gallery: [],
  })
})

test('normalizeProject rejects malformed project data', () => {
  assert.equal(typeof projects.normalizeProject, 'function')
  assert.throws(() => projects.normalizeProject({ name: 'Missing ID' }), /project id/i)
})
