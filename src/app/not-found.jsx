import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found">
      <p>That page could not be found.</p>
      <Link href="/">Return home</Link>
    </main>
  )
}
