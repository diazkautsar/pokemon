import '../styles/globals.css'
import { AppProps } from 'next/app'
import { PokemonProvider } from '../context/index'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PokemonProvider>
        <Component {...pageProps} />
      </PokemonProvider>
    </>
  )
}

export default App
