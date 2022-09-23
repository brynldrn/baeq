import Head from 'next/head';
import Page from './components/Page/Page';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <main className="bg-pastel-black text-white h-screen w-full pt-40">
        <Page />
      </main>
    </>
  )
}
