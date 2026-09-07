import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found">
      <p>That project is no longer in this orbit.</p>
      <Link href="/">Return home</Link>
    </main>
  )
}
