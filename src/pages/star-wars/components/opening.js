import { useRef, useEffect } from 'react';

export default function Opening() {
  const galaxyPlane = useRef(null);
  const openingLogo = useRef(null);
  const openingHeading = useRef(null);

  // Sets the number of stars we wish to display
  const numStars = 100;

  useEffect(() => {
    plotStars();

    window.addEventListener('resize', debounce(() => {
      removeAllStars();
      plotStars();
    }))

    setTimeout(() => {
      document.body.classList.add('--animated');

      window.addEventListener('scroll', () => {
        const logo = openingLogo.current;
        const heading = openingHeading.current;
        const scrollY = window.scrollY;
        const speed = scrollY * 0.02;

        logo.style.top = `${45 - (speed / 45) * 100 < 10 ? 10 : 45 - (speed / 45) * 100}%`;
        heading.style.opacity = `${100 - (scrollY * 0.8)}%`;
      })
    }, 18000);
  });

  const debounce = (func, wait, immediate) => {
    let timeout;

    return function () {
      const context = this,
        args = arguments;

      const later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  const plotStars = () => {
    // For every star we want to display
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      const [x, y] = getRandomPosition();

      star.style.top = `${x}px`;
      star.style.left = `${y}px`;

      galaxyPlane.current.parentElement.append(star);
    }
  }

  const removeAllStars = () => {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => star.remove());
  }

  const getRandomPosition = () => {
    const y = window.innerWidth;
    const x = window.innerHeight;

    const randomX = Math.floor(Math.random()*x);
    const randomY = Math.floor(Math.random()*y);

    return [randomX, randomY];
  }

  return(
    <section ref={galaxyPlane} className="opening">
      <span className="opening__intro">A long time ago, in a galaxy far <br />far away...</span>
      <div ref={openingLogo} className="opening__logo">
        <span>BRYAN ALDRIN</span>
        <span>QUINALAYO</span>
      </div>
      <div ref={openingHeading} className="opening__heading">
        <div className="opening__details">Full Stack Developer. Meme Junkie. <br />Crypto Enthusiast. Gamer.</div>
        <ul className="opening__socials">
          <li><a target="_blank" href="https://github.com/brynldrn" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg></a></li>
          <li><a target="_blank" href="https://linkedin.com/in/bryan-aldrin-quinalayo-144097100" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4"
              height="12" /><circle cx="4" cy="4" r="2" /></svg></a></li>
          <li><a target="_blank" href="https://www.youtube.com/channel/UC7gclUD1s8AmvTRVxwVnIOA" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="feather feather-youtube"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg></a></li>
        </ul>
      </div>
    </section>
  );
}
