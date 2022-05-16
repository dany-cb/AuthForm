import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import 'reset-css'
import customTheme from '../theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
