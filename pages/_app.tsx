import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
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
        <Component {...pageProps} />
      </CssVarsProvider>
    </QueryClientProvider>
  )
}

export default MyApp
