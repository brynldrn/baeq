import Head from 'next/head';
import HomePaper from '../components/HomePaper/HomePaper';
import Page from '../components/Page/Page';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Full Stack Web Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <main className="bg-pastel-black text-white h-screen w-full pt-40">
        <div className='w-[90%] max-w-[980px] mx-auto h-auto'>
          <Page>
            <HomePaper />
          </Page>
        </div>
        
        
        <div className="mt-6 relative overflow-hidden w-[90%] max-w-[980px] mx-auto h-auto min-h-[540px]">
          <Page className="absolute top-0 left-0 w-full h-full">
            test
          </Page>
          <Page className="absolute top-0 left-0 w-full h-full">
            test
          </Page>
          <Page className="absolute top-0 left-0 w-full h-full">
            test
          </Page>
        </div>
      </main>
    </>
  )
}
