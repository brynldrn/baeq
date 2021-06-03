import Head from 'next/head'
import { gql } from "@apollo/client";
import client from '../apollo-client';
import Galaxy from './components/galaxy';

export default function Home({ projects }) {

  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
        <meta name="description" content="Professional Portfolio" />
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
        <Galaxy />
      </main>
    </>
  )
}

export async function getServerSideProps() {
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