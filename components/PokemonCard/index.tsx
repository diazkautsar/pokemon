/** @jsxImportSource @emotion/react */
import React from 'react'
import { useRouter } from 'next/router'
import { usePokemonContext } from '../../context/index'

type Props = {
  name?: string,
  image?: string
}

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const PokemonCard: React.FunctionComponent<Props> = ({ name, image }) => {
  const { changeImageDetailUrl } = usePokemonContext()
  const router = useRouter()

  const changePage = (name: string, url: string) => {
    changeImageDetailUrl(url)
    router.push(`/pokemon/${name}`)
  }

  return (
    <div
      onClick={() => changePage(name, image)}
      css={{
        boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px',
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
        Owned:
      </div>
    </div>
  )
}

export default PokemonCard
