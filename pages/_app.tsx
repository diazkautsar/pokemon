import '../styles/globals.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AppProps } from 'next/app'
import { PokemonProvider } from '../context/index'
import Layout from '../components/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PokemonProvider>
        <Layout Component={Component} {...pageProps} />
      </PokemonProvider>
    </>
  )
}

export default App
