/** @jsxImportSource @emotion/react */
import React, { useState, MouseEvent } from 'react'
import HomePage from '../components/HomePage'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../libs/apollo'
import { GET_POKEMONS } from '../utils/graphql/queries'
import Loading from '../components/Loading'


const gqlVariables = {
  limit: 25,
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
  const client = initializeApollo()
  const [pokemons, setPokemons] = useState(pageProps.pokemons.results)
  const [offset, setOffset] = useState<number>(gqlVariables.limit)
  const [limit] = useState<number>(gqlVariables.limit)
  const [totalPokemon] = useState<number>(pageProps.pokemons.count)
  const [isAllPokemon, setIsAllPokemon] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const loadMorePokemon = (event: MouseEvent) => {
    setLoading(true)
    event.preventDefault()
    client.query({
      query: GET_POKEMONS,
      variables: {
        limit,
        offset: offset + 1,
      }
    })
      .then(({ data }) => {
        const newPokemons = pokemons.concat(data.pokemons.results)
        setPokemons(newPokemons)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setOffset(offset + 1)
        setLoading(false)
      })
  }

  const seeAllPokemon = (event: MouseEvent) => {
    setLoading(true)
    event.preventDefault()
    client.query({
      query: GET_POKEMONS,
      variables: {
        limit: totalPokemon,
        offset: 1,
      }
    })
      .then(({ data }) => {
        setPokemons(data.pokemons.results)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsAllPokemon(true)
        setLoading(false)
      })
  }

  return (
    <React.Fragment>
      <HomePage
        pokemons={pokemons}
        loadMorePokemon={loadMorePokemon}
        seeAllPokemon={seeAllPokemon}
        isAllPokemon={isAllPokemon}
      />
      { loading && <Loading /> }
    </React.Fragment>
  )
}

export default Home