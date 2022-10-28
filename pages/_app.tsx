import '../styles/globals.css'
import type { AppProps } from 'next/app'
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


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <Component {...pageProps} />
    </CssVarsProvider>
  )
}

export default MyApp
