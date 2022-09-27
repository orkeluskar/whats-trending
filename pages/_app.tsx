import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CssVarsProvider } from '@mui/joy/styles';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider>
        <Component {...pageProps} />
      </CssVarsProvider>
    </QueryClientProvider>
  )
}

export default MyApp
