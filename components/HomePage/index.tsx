/** @jsxImportSource @emotion/react */
import { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import { usePokemonContext } from '../../context/index'

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
}

interface Props {
  pokemons: pokemonTypes
}


const HomePage: FunctionComponent<Props> = ({ ...pageProps }) => {
  const { changeImageDetailUrl } = usePokemonContext()
  const router = useRouter()
  const [pokemons, setPokemons] = useState(pageProps.pokemons)

  const changePage = (name: string, url: string) => {
    changeImageDetailUrl(url)
    router.push(`/pokemon/${name}`)
  }

  return (
    <div css={{
      color: "red",
      display: "flex",
      flexWrap: 'wrap',
      margin: 'auto',
      alignContent: 'center',
      alignItems: 'center',
    }}>
      { pokemons.results.map((item, index) => {
        return (
          <div onClick={() => changePage(item.name, item.image)} key={index}>
            <img css={{ width: '125px', height: 'auto' }} src={item.image} alt={item.name} />
            <div css={{ textAlign: 'center' }}> { item.name } </div>
          </div>
        )
      })}
    </div>
  )
}


export default HomePage
