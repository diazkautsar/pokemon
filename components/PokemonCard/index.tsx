/** @jsxImportSource @emotion/react */
import React from 'react'
import { useRouter } from 'next/router'
import { usePokemonContext } from '../../context/index'

type Props = {
  name?: string,
  image?: string,
  nickname?: string,
  owned?: number,
}

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const PokemonCard: React.FunctionComponent<Props> = ({ name, image, nickname, owned }) => {
  const { changeImageDetailUrl } = usePokemonContext()
  const router = useRouter()

  const changePage = (name: string, url: string) => {
    changeImageDetailUrl(url)
    router.push(`/pokemon/${name}`)
  }

  const cekOwnedPokemon = () => {
    const mypokemons = JSON.parse(localStorage.getItem('myPokemons'))
    if (mypokemons) {
      const filterPokemon = mypokemons.filter(item => item.name === name)
      if (filterPokemon.length) {
        return filterPokemon.length
      }

      return 0

    } else {
      return 0
    }

  }

  return (
    <div
      onClick={() => changePage(name, image)}
      css={{
        boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 25px 6px',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '20px',
        padding: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      <img
        css={{
          width: '200px',
          height: 'auto',
          [mq[1]]: {
            width: '125px'
          },
        }}
        src={image}
        alt={name}
      />
      <div
        css={{
          textAlign: 'center',
          margin: '.75rem 0',
          [mq[1]]: {
            fontSize: '.75rem'
          },
        }}
      >
        {name.toUpperCase()}
      </div>
      <div
        css={{
          textAlign: 'center',
          margin: '.75rem 0',
          [mq[1]]: {
            fontSize: '.75rem'
          },
        }}
      >
        {/* Owned: */}
        <span css={{
          backgroundColor: 'rgb(255, 203, 5)',
          borderRadius: '5px',
          padding: '5px'
        }}>
          { nickname ? nickname : `Owned: ${owned + cekOwnedPokemon()}` }
        </span>
      </div>
    </div>
  )
}

export default PokemonCard
