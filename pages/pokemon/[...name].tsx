import React, { FunctionComponent, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { initializeApollo } from '../../libs/apollo'
import { GET_DETAIL_POKEMONS } from '../../utils/graphql/queries'
import { usePokemonContext } from '../../context/index'

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async context => {
  try {
    const queryParams = context.params.name[0]
    const client = initializeApollo()
    const variables = {
      name: queryParams
    }
  
    let value;
  
    const { data } = await client.query({
      query: GET_DETAIL_POKEMONS,
      variables,
    })

    // console.log(data, 'ini static props')
    // value.push(data.pokemon)
    value = data.pokemon
    
    // console.log(value)
  
    return {
      props: {
        pokemon: value,
      }
    }
  } catch (error) {
    
  }
}

type __typename = {
  __typename?: string | null | undefined,
}

type pointingNameType = __typename & {
  name?: string | null | undefined,
}

type abilitiesType = __typename & {
  ability?: pointingNameType,
}

type movesType = __typename & {
  move?: pointingNameType,
}

type typeTypes = __typename & {
  type?: pointingNameType,
}

type pokemonTypes = __typename & {
  id?: number,
  name?: string | null | undefined,
  abilities?: abilitiesType[] | null | undefined,
  moves?: movesType[] | null | undefined,
  types?: typeTypes[] | null | undefined,
  message?: string | null | undefined,
  status?: boolean | null | undefined
}

interface Props {
  pokemon: pokemonTypes
}

const PokemonDetail: FunctionComponent<Props> = ({ pokemon }) => {
  const { imageDetailUrl } = usePokemonContext()
  const [abilities] = useState(pokemon.abilities)
  const [moves] = useState(pokemon.moves)
  const [types] = useState(pokemon.types)

  return (
    <React.Fragment>
      <div>
        {abilities.map((item, index) => {
          return (
            <div key={index}> {item.ability.name} </div>
          )
        })}
        
        {moves.map((item, index) => {
          return (
            <div key={index}> {item.move.name} </div>
          )
        })}
        
        {types.map((item, index) => {
          return (
            <div key={index}> {item.type.name} </div>
          )
        })}
        {/* {pokemon.abilities.map((item, index) => {
          return (
            <div key={index}> { item.name } </div>
          )
        })} */}
        { imageDetailUrl }
      </div>
    </React.Fragment>
  )
}

export default PokemonDetail