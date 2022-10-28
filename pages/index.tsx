import {  Divider } from '@mui/joy'
import axios from 'axios'
import type {  NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TrendTabs from '../components/tabs'
import styles from '../styles/Home.module.css'
import { useColorScheme } from '@mui/joy/styles';

import Heading from '../components/heading';

export async function getServerSideProps(context: NextPageContext) {
  const getPosts = async (): Promise<any[]> => {
    const url = process.env.API_URL;
    const { data } = await axios.get(`${url}/api/posts`)
    return data;
  }
  return {
    props: {
      data: await getPosts()
    }
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
        <title>Whats Trendin</title>
        <meta name="description" content="Whats Trendin" />
        <link rel="icon" href="/favicon.ico" />
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
