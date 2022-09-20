import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { definitions } from '../types/client';

type Post = definitions['posts']

const Home: NextPage = () => {
  const getPosts = async (): Promise<Post[]> => {
    const { data } = await axios.get('/api/posts')
    return data;
  }
  const { isLoading, isError, data, error } = useQuery(['posts'], getPosts)

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error fetching posts: ${JSON.stringify(error)}</div>
  }

  return (
    <div >
      <Head>
        <title>Test App</title>
        <meta name="description" content="Test App" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main className={styles.main}>
       {
        data.map((post) => (
          <div key={post.id}>
            <div>{post.id}</div>
            <a href={post.url} target='_blank' rel="noreferrer">{post.url}</a>
            <div>{post.created_at}</div>
          </div>
        ))
       }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
