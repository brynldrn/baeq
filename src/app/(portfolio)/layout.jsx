import Link from 'next/link'

export default function PortfolioLayout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="site-name" href="/">BAEQ</Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <a href="https://github.com/brynldrn" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/bryan-aldrin-quinalayo/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <p>Bryan Aldrin Quinalayo, full-stack software engineer.</p>
        <p className="footer-easter-eggs">
          <Link href="/glass">glass</Link>
          <Link href="/star-wars">star wars</Link>
        </p>
      </footer>
    </div>
  )
}
