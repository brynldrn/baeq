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
            <span className="material-icons material-icons-outlined">more_vert</span>
            <span className="material-icons material-icons-outlined">close</span>
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
      </div>
    </header>
  )
}