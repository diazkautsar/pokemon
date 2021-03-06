/** @jsxImportSource @emotion/react */
import React, { FunctionComponent, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

import { initializeApollo } from '../../libs/apollo'
import { GET_DETAIL_POKEMONS } from '../../utils/graphql/queries'
import { usePokemonContext } from '../../context/index'
import Tag from '../../components/Tag'
import Gatcha from '../../components/Gatcha'

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
    value = data.pokemon
  
    return {
      props: {
        pokemon: value,
        name: queryParams,
      }
    }
  } catch (error) {
    console.log(error)
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
  pokemon: pokemonTypes,
  name?: string,
}

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const PokemonDetail: FunctionComponent<Props> = ({ pokemon, name }) => {
  const { imageDetailUrl } = usePokemonContext()
  const [abilities] = useState(pokemon.abilities)
  const [moves] = useState(pokemon.moves)
  const [types] = useState(pokemon.types)
  const [srcImage, setSrcImage] = useState<string>(null)
  const [isGatcha, setIsGatcha] = useState<boolean>(false)

  React.useEffect(() => {
    if (!imageDetailUrl) {
      setSrcImage(localStorage.getItem('imageDetailUrl'))
    }
  }, [])

  const gatchaPokemon = () => {
    setIsGatcha(true)
  }

  return (
    <React.Fragment>
      <div css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        marginTop: '5rem'
      }}>
        <div
          css={{
            boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 25px 6px',
            backgroundColor: 'rgb(255, 255, 255)',
            padding: '25px',
            borderRadius: '5px',
            width: '75%',
            [mq[1]]: {
              width: '100%',
              minHeight: '100vh'
            },
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              alignContent: 'center',
              [mq[1]]: {
                flexDirection: 'column'
              },
            }}
          >
            <div>
              <div> <img src={imageDetailUrl ? imageDetailUrl : srcImage} css={{ width: '300px', height: 'auto' }} /> </div>
              <div css={{ margin: '5px 0', fontSize: '2.5rem' }}> { name.toUpperCase() } </div>
              { !isGatcha && (
                <div css={{ display: 'flex', justifyContent: 'center' }}>
                  {types.map((item, index) => {
                    return (
                      <div key={index} css={{ margin: '.1rem' }} > <Tag types={'type'} name={item.type.name} /> </div>
                    )
                  })}
                </div>
              )}
            </div>

            {!isGatcha ? (
              <div>
                <div className="abilities">
                  <div
                    css={{
                      marginBottom: '.7rem',
                      textAlign: 'left',
                      fontSize: '1rem',
                      borderBottom: '1px dashed black'
                    }}>
                    ABILITIES
                  </div>
                  <div
                    css={{
                      display: 'flex',
                      justifyContent: 'start',
                      flexWrap: 'wrap'
                    }}
                  >
                    {abilities.map((item, index) => {
                      return (
                        <div key={index} css={{ marginBottom: '5px' }} > <Tag types={'abilities'} name={item.ability.name} /> </div>
                      )
                    })}
                  </div>
                </div>

                <div className="moves" css={{ marginTop: '1rem' }}>
                  <div
                    css={{
                      marginBottom: '.7rem',
                      textAlign: 'left',
                      fontSize: '1rem',
                      borderBottom: '1px dashed black'
                    }}>
                    MOVES
                  </div>
                  <div
                    css={{
                      display: 'flex',
                      justifyContent: 'start',
                      flexWrap: 'wrap'
                    }}
                  >
                    {moves.map((item, index) => {
                      return (
                        <div key={index} css={{ marginBottom: '5px' }} > <Tag types={'move'} name={item.move.name} /> </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Gatcha
                imageUrl={imageDetailUrl ? imageDetailUrl : srcImage}
                name={name}  
              />
            )}
          </div>

          {!isGatcha && (
            <div
              css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                borderTop: '1px dashed black',
                marginTop: '10px'
              }}
            >
              <div
                css={{
                  marginTop: '1rem',
                  padding: '15px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  ":hover": {
                    backgroundColor: 'rgb(255, 203, 5)'
                  }
                }}
                onClick={(e) => gatchaPokemon()}
              >
                <Image
                  src="/pokeball.png"
                  alt="pokeball"
                  width={75}
                  height={75}
                />
                <div> CATCH </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default PokemonDetail