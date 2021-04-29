import Head from 'next/head'
import React from 'react'
// import styles from '../styles/Home.module.css'
import HomePage from '../components/HomePage'

import { GetServerSideProps } from 'next'
import { initializeApollo } from '../libs/apollo'

import { GET_POKEMONS } from '../utils/graphql/queries'



const gqlVariables = {
  limit: 10,
  offset: 1,
};

export const getServerSideProps: GetServerSideProps = async context => {
  const client = initializeApollo()
  let values
  await client.query({
    query: GET_POKEMONS,
    variables: gqlVariables,
  })
    .then(({ data }) => {
      values = data.pokemons
    })
    .catch(err => {
      console.log(err)
    })

  return {
    props: { pokemons: values }
  }
}

function Home({ ...pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage pokemons={pageProps.pokemons} {...pageProps} />
    </React.Fragment>
  )
}

export default Home