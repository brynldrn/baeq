import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../src/components/portfolio/PortfolioScene.jsx', import.meta.url), 'utf8')
const navigation = source.match(/<nav className="portfolio-nav glass"[\s\S]*?<\/nav>/)?.[0]

test('portfolio navigation uses brand marks and the Lucide Star icon', () => {
  assert.ok(navigation)
  const linkedIn = navigation.match(/aria-label="LinkedIn"><svg[\s\S]*?<\/svg>/)?.[0]

  assert.match(linkedIn, /fill="none"/)
  assert.match(linkedIn, /stroke="currentColor"/)
  assert.match(linkedIn, /strokeWidth="2"/)
  assert.match(linkedIn, /strokeLinecap="round"/)
  assert.match(linkedIn, /strokeLinejoin="round"/)
  assert.match(linkedIn, /<circle cx="4" cy="4" r="2" \/>/)
  assert.match(linkedIn, /<rect width="4" height="12" x="2" y="9" \/>/)
  assert.match(linkedIn, /<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" \/>/)
  assert.match(navigation, /aria-label="GitHub"><svg[^>]*data-brand="github"/)
  assert.match(navigation, /aria-label="Legacy Star Wars portfolio"><Star \/>/)
  assert.doesNotMatch(navigation, /BriefcaseBusiness|Code2|Sparkles/)
  assert.match(source, /<div className="profile-actions">[\s\S]*?<BriefcaseBusiness \/>/)
})
