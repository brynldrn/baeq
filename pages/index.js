import Head from 'next/head'
import Intro from './components/intro'
import Marker from './components/marker'
import Navigation from './components/navigation'
import Works from './components/works'
import { gql } from "@apollo/client";
import client from '../apollo-client';

export default function Home({ projects }) {
  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation/>
      <main>
        <Intro/>
        <Works projects={projects}/>
      </main>
      <Marker/>
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