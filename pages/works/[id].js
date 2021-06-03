import { getAllWorks, getById } from '../../lib/works';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function Work({ work }) {
  console.log(work)
  const { name, year, longMd } = work.project;

  return (
    <>
    <Head>
      <title>Work - { name } | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
      <meta name="description" content={`${name} Project - Professional Portfolio`} />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="work">
      <div className="work__navigation">
        <Link href="/">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Go Back</a>
        </Link>
      </div>
      <div className="work__header">
        <span className="work__header-eyebrow">{ year }</span>
        <h1 className="work__header-title">{ name }</h1>
      </div>
      <div className="work__body">
        <ReactMarkdown>{ longMd }</ReactMarkdown>
      </div>
    </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllWorks();

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const work = await getById(params.id);

  return {
    props: {
      work
    }
  }
}