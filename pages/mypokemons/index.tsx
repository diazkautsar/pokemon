/** @jsxImportSource @emotion/react */
import React from 'react';
import PokemonCard from '../../components/PokemonCard'
import Image from 'next/image'

type pokemons = {
  name?: string,
  nickname?: string,
  imageUrl?: string,
}

type MyPokemons = pokemons[]

const MyPokemon: React.FunctionComponent = () => {
  const [pokemons, setPokemons] = React.useState<MyPokemons>(null)

  React.useEffect(() => {
    setPokemons(JSON.parse(localStorage.getItem('myPokemons')))
  }, [])

  return (
    <React.Fragment>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '8rem'
        }}
      >
        {
          pokemons ? pokemons.map((item, index) => {
            return (
              <PokemonCard key={index} name={item.name} image={item.imageUrl} nickname={item.nickname} />
            )
          }) : (
            <>
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'center'
                }}
              >
                <div>
                  <Image
                    src="/pokeball.png"
                    alt="pokeball"
                    width={150}
                    height={150}
                    css={{
                      animation: 'rotation 10s infinite linear',
                    }}
                  />
                </div>
                <div css={{ marginTop: '20px', fontSize: '50px' }}> You Have No Pokemons Yet </div>  
              </div>
            </>
          )
        }
      </div>
    </React.Fragment>
  )
}

export default MyPokemon
