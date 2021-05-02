import '../styles/globals.css'
import 'nprogress/nprogress.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

import { ToastProvider } from 'react-toast-notifications'

import { PokemonProvider } from '../context/index'
import Layout from '../components/Layout'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon</title>
        <link rel="icon" href="/pokeball.png" />
      </Head>
      <PokemonProvider>
        <ToastProvider
          placement="top-center"
        >
          <Layout Component={Component} {...pageProps} />
        </ToastProvider>
      </PokemonProvider>
    </>
  )
}

export default App
