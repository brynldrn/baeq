import Head from 'next/head'
import Navigation from './components/navigation'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation/>
    </>
  )
}
