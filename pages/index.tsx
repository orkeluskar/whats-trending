import {  Divider } from '@mui/joy'
import axios from 'axios'
import type {  NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TrendTabs from '../components/tabs'
import styles from '../styles/Home.module.css'
import { useColorScheme } from '@mui/joy/styles';

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
  const { mode, setMode } = useColorScheme();
  setMode('dark')

  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <title>WhatsTrending - Trending Updates from Social Medias</title>
        <meta name="title" content="WhatsTrending - Trending Updates from Social Medias"></meta>
        <meta name="description" content="Stay up-to-date with the latest trends from Twitter, YouTube, Google, Spotify, Reddit, Netflix, and TikTok. Explore popular hashtags, viral videos, trending music, and more!"></meta>

        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://whats-trending.vercel.app"></meta>
        <meta property="og:title" content="WhatsTrending - Trending Updates from Social Medias"></meta>
        <meta property="og:description" content="Stay up-to-date with the latest trends from Twitter, YouTube, Google, Spotify, Reddit, Netflix, and TikTok. Explore popular hashtags, viral videos, trending music, and more!"></meta>
        <meta property="og:image" content="https://uwyebjbwfzfrdwcyusnp.supabase.co/storage/v1/object/public/static/preview.png"></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:url" content="https://whats-trending.vercel.app"></meta>
        <meta property="twitter:title" content="WhatsTrending - Trending Updates from Social Medias"></meta>
        <meta property="twitter:description" content="Stay up-to-date with the latest trends from Twitter, YouTube, Google, Spotify, Reddit, Netflix, and TikTok. Explore popular hashtags, viral videos, trending music, and more!"></meta>
        <meta property="twitter:image" content="https://uwyebjbwfzfrdwcyusnp.supabase.co/storage/v1/object/public/static/preview.png"></meta>
      </Head>

      <main className={styles.main}>
       <Heading />
       <Divider sx={{ margin: 1 }}/>
       <TrendTabs posts={data} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="ok logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
