import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [navActive, setNavActive] = useState(false);

  const handleToggleClick = () => {
    setNavActive(!navActive);
  }

  return (
    <header className="navigation">
      <div className="navigation__wrapper">
        <div className="navigation__logo">
          <Link href="/">
            <a>.baeq()</a>
          </Link>
        </div>
        <div className="navigation__links">
          <button onClick={handleToggleClick} className={`navigation__trigger ${navActive ? '--active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <nav className={`navigation__drawer ${ navActive ? '--active' : '' }`}>
            <ul>
              <li>
                <Link href="/about">
                  <a>.about()</a>
                </Link>
              </li>
              <li>
                <Link href="/uses">
                  <a>.uses()</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="navigation__desktop">
          <ul>
            <li>
              <Link href="/about">
                <a>.about()</a>
              </Link>
            </li>
            <li>
              <Link href="/uses">
                <a>.uses()</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}