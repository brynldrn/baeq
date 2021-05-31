import Head from 'next/head'
import Intro from './components/intro'
import Marker from './components/marker'
import Navigation from './components/navigation'
import { gql } from "@apollo/client";
import client from '../apollo-client';
import Link from 'next/link';
import Footer from './components/footer';

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
        <section className="works">
          <div className="works__wrapper">
            <h1 className="works__header">Works</h1>
            
            {
              projects.map(({ id, name, year, imageCap }, key) => (
                <Link href={`/works/${id}`} key={key}>
                  <article className="works__project" id={id}>
                    <figure>
                      <picture>
                        <img src={imageCap.url} alt="Project Image" />
                      </picture>
                    </figure>
                    <div className="works__project-caption">
                      <span className="works__project-name">{ name }</span>
                      <span className="works__project-year">{ year }</span>
                    </div>
                  </article>
                </Link>
              ))
            }

          </div>
        </section>
      </main>
      <Marker/>
      <Footer/>
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