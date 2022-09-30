import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  getInitColorSchemeScript
} from '@mui/joy/styles';

const muiTheme = extendMuiTheme()
const joyTheme = extendJoyTheme();

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
const theme = deepmerge(muiTheme, joyTheme);


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        {getInitColorSchemeScript()}
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/ios/16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/ios/32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
          
          <meta name="description" content="Whats Trending across social media" />
          <link rel="icon" href="/favicon.ico" />
          <title>Whats Trendin</title>
        </Head>
        <Component {...pageProps} />
      </CssVarsProvider>
    </QueryClientProvider>
  )
}

export default MyApp
