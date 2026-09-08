import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const appFavicon = new URL('../src/app/favicon.ico', import.meta.url)
const publicFavicon = new URL('../public/favicon.ico', import.meta.url)
const expectedHash = 'fa3f996c077dcbb9d223a73ec18acca85e798f918e2aff0da0e6847a4b53b0d1'

test('uses the restored App Router favicon asset', () => {
  assert.equal(existsSync(appFavicon), true)
  assert.equal(createHash('sha256').update(readFileSync(appFavicon)).digest('hex'), expectedHash)
  assert.equal(existsSync(publicFavicon), false)
})
