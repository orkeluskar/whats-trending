import {  Divider } from '@mui/joy'
import axios from 'axios'
import type {  NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TrendTabs from '../components/tabs'
import styles from '../styles/Home.module.css'

import Heading from '../components/heading';

export async function getStaticProps(context: NextPageContext) {
  const getPosts = async (): Promise<any[]> => {
    const url = process.env.API_URL;
    const { data } = await axios.get(`${url}/api/posts`)
    return data;
  }
  return {
    props: {
      data: await getPosts()
    },
    revalidate: 60
  }
}

export type HomePageType = {
  data: any
}

const Home = (props : HomePageType) => {
  const { data } = props;

  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <title>Trendzy - Trending Updates from Social Medias</title>
        <meta name="title" content="Trendzy: Top Stories & News - Stay Updated Worldwide"></meta>
        <meta name="description" content="Discover trending topics, news, and stories from around the world with What's Trending – your go-to source for real-time updates and insights."></meta>

        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://whats-trending.vercel.app"></meta>
        <meta property="og:title" content="Trendzy: Top Stories & News - Stay Updated Worldwide"></meta>
        <meta property="og:description" content="Discover trending topics, news, and stories from around the world with What's Trending – your go-to source for real-time updates and insights."></meta>
        <meta property="og:image" content="https://uwyebjbwfzfrdwcyusnp.supabase.co/storage/v1/object/public/static/preview.png?t=2023-04-24T11%3A30%3A38.784Z"></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content="Trendzy: Top Stories & News - Stay Updated Worldwide"></meta>
        <meta property="twitter:description" content="Discover trending topics, news, and stories from around the world with What's Trending – your go-to source for real-time updates and insights."></meta>
        <meta property="twitter:image" content="https://uwyebjbwfzfrdwcyusnp.supabase.co/storage/v1/object/public/static/preview.png?t=2023-04-24T11%3A30%3A38.784Z"></meta>
        <link rel="canonical" href="https://whats-trending.vercel.app/" />

        <meta name="google-site-verification" content="plNjT22lnKm9msdZWw8yPXGwPh81snTSfML-zPgRLqQ" />
      </Head>

      <main className={styles.main}>
       <Heading />
       <Divider sx={{ margin: 1 }}/>
       <TrendTabs posts={data} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://omkarkeluskar.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="ok logo" width={24} height={24} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
