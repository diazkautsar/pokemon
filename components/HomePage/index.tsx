/** @jsxImportSource @emotion/react */
import { FunctionComponent, MouseEvent } from 'react'
import PokemonCard from '../PokemonCard'
import styled from '@emotion/styled'
import Image from 'next/image'

type pokemonTypes = {
  __typename?: string,
  count?: number,
  next?: string | null | undefined,
  previous?: string | null | undefined,
  status?: boolean | null | undefined,
  message?: string | null | undefined,
  results?: resultsTypes[]
}

type resultsTypes = {
  __typename?: string,
  url?: string,
  name?: string,
  image?: string,
  owned?: number,
}

interface Props {
  pokemons: resultsTypes[]
  loadMorePokemon?: (event: MouseEvent) => void,
  seeAllPokemon?: (event: MouseEvent) => void,
  isAllPokemon?: boolean,
  loading?: boolean
}


const Button = styled('div')`
  padding: 10px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 25px 6px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`


const HomePage: FunctionComponent<Props> = ({ loadMorePokemon, pokemons, isAllPokemon, seeAllPokemon, loading }) => {
  return (
    <>
      <div css={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '8rem'
      }}>
        { pokemons.map((item, index) => {
          return (
            <PokemonCard key={index} name={item.name} image={item.image} owned={item.owned} />
          )
        })}
      </div>
      { !isAllPokemon && (
        <div css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '10px',
        }}
        >
          { loading ? (
            <Image
              src="/pokeball.png"
              alt="pokeball"
              width={50}
              height={50}
              css={{
                animation: 'rotation 10s infinite linear',
              }}
            />
          ) : (
            <>
              <div
                onClick={(e) => loadMorePokemon(e)}
                css={{
                  margin: '5px 10px',
                }}
              >
                <Button> Load More Pokemon </Button>
              </div>
              <div
                css={{
                  margin: '5px 10px'
                }}
                onClick={(e) => seeAllPokemon(e)}
              >
                <Button> See All Pokemon </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}


export default HomePage
