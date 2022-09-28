import { useState } from 'react'
import classNames from 'classnames';
import { Facebook, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { Waypoint } from 'react-waypoint';

const HomePaper = () => {
  const [linksVisible, setLinksVisible] = useState(false)

  return (
    <>
      <TypeAnimation 
        sequence={['Bryan Aldrin Quinalayo', 1000]}
        wrapper="p"
        cursor={false}
      />
      <TypeAnimation 
        sequence={[1500, 'Senior React Developer']}
        wrapper="span"
        cursor={false}
        className='block text-3xl'
      />
      
      <TypeAnimation 
        sequence={[3000, "Hi! I'm Bryan, a Senior React Developer from the Philippines. Please see my contact details below to contact me for any exciting projects!"]}
        wrapper="span"
        cursor={false}
        className='block text-3xl mt-10'
        speed={90}
      />

      
      <Waypoint onEnter={() => setLinksVisible(true)}>
        <div className={classNames('mt-[54px] flex flex-row flex-wrap transition ease-in-out delay-[5000ms]', {
          'opacity-0': !linksVisible,
          'opacity-100': linksVisible
        })}>
          <Link href="uses">
            <a className='text-3xl underline'>/uses</a>
          </Link>
          <Link href="#projects">
            <a className='text-3xl block ml-5 underline'>/projects</a>
          </Link>
          <Link href="star-wars">
            <a className='text-3xl block ml-5 underline'>/star-wars</a>
          </Link>
        </div>
      </Waypoint>

      <Waypoint onEnter={() => setLinksVisible(true)}>
        <div className={classNames('mt-0 flex flex-row flex-wrap items-center transition ease-in-out delay-[5000ms] mb-16', {
          'opacity-0': !linksVisible,
          'opacity-100': linksVisible
        })}>
          <a href="https://github.com/brynldrn" target="_blank" className='text-3xl block underline'>
            <Github />
          </a>
          <a href="https://www.facebook.com/bryanaldrin09" target="_blank" className='text-3xl block ml-5 underline'>
            <Facebook />
          </a>
          <a href="https://www.linkedin.com/in/bryan-aldrin-quinalayo/" target="_blank" className='text-3xl block ml-5 underline'>
            <Linkedin />
          </a>
        </div>
      </Waypoint>
    </>
  )
}

export default HomePaper;
