/** @jsxImportSource @emotion/react */
import React, { useState, MouseEvent } from 'react'
import HomePage from '../components/HomePage'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../libs/apollo'
import { GET_POKEMONS } from '../utils/graphql/queries'


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
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState<number>(gqlVariables.limit)
  const [limit] = useState<number>(gqlVariables.limit)
  const [totalPokemon] = useState<number>(pageProps.pokemons.count)
  const [isAllPokemon, setIsAllPokemon] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  React.useEffect(() => {
    let getPokemons;

    if (JSON.parse(localStorage.getItem('pokemonList'))) {
      getPokemons = JSON.parse(localStorage.getItem('pokemonList'))
    } else {
      getPokemons = pageProps.pokemons.results
    }

    const updatePokemon = getPokemons.map(item => {
      return {
        ...item,
        owned: item.owned ? item.owned : 0
      }
    })

    setPokemons(updatePokemon)
    localStorage.setItem('pokemonList', JSON.stringify(updatePokemon))
  }, [])

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
        const addOwnedToPokemonList = data.pokemons.results.map(item => {
          return {
            ...item,
            owned: item.owned ? item.owned : 0
          }
        })

        const joinWithPreviousList = pokemons.concat(addOwnedToPokemonList)

        localStorage.setItem('pokemonList', JSON.stringify(joinWithPreviousList))
        setPokemons(joinWithPreviousList)
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
        const addOwnedToPokemonList = data.pokemons.results.map(item => {
          return {
            ...item,
            owned: item.owned ? item.owned : 0
          }
        })
        localStorage.setItem('pokemonList', JSON.stringify(addOwnedToPokemonList))
        setPokemons(addOwnedToPokemonList)
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
        loading={loading}
      />
    </React.Fragment>
  )
}

export default Home