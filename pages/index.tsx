import { CircularProgress, Divider, Typography } from '@mui/joy'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import TrendTabs from '../components/tabs'
import styles from '../styles/Home.module.css'
import { definitions } from '../types/client'
import { useColorScheme } from '@mui/joy/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type Post = definitions['posts']

const Home: NextPage = () => {
  const { mode, setMode } = useColorScheme();
  setMode('dark')
  const getPosts = async (): Promise<any[]> => {
    const { data } = await axios.get('/api/posts')
    return data;
  }
  const { isLoading, isError, data, error } = useQuery(['posts'], getPosts)

  if (isLoading) {
    return <main className={styles.main}><CircularProgress /></main>;
  }

  if (isError) {
    return <div>Error fetching posts: ${JSON.stringify(error)}</div>
  }

  return (
    <div >

      <main className={styles.main}>
       <Typography level="h3">What&apos;s Trending in US
        <Tooltip title="Support for other geo(s) coming soon" enterTouchDelay={0} sx={{ marginBottom: '2rem' }}>
          <IconButton size='small'>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
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
