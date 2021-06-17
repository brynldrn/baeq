import Head from 'next/head'
import { gql } from "@apollo/client";
import client from '../apollo-client';
import Opening from '../components/opening';
import About from '../components/about';
import Work from '../components/work';
import Aos from 'aos';
import { useEffect } from 'react';

export default function Home({ projects }) {

  useEffect(() => {
    Aos.init();
  });

  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <link
            rel="preload"
            href="/fonts/starjedi/sfdistantgalaxyoutline-xoeo-webfont.woff2"
            as="font"
            crossOrigin=""
          />
        <link
            rel="preload"
            href="/fonts/starjedi/sfdistantgalaxyoutline-xoeo-webfont.woff"
            as="font"
            crossOrigin=""
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="galaxy">
          <Opening />
          <About />
          <section className="works container">
            <h1><code>works</code></h1>
            <div className="works__container">
              {
                projects.map(({ imageCap, name, year }, key) => {
                  return (
                    <Work key={key} index={key} imageCap={imageCap.url} name={name} year={year} />
                  )
                })
              }
            </div>
          </section>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        projects(orderBy: year_DESC) {
          id,
          name,
          year,
          imageCap {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      projects: data.projects,
    },
  };
}