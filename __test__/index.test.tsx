import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import PokemonCard from '../components/PokemonCard'
import HomePage from '../components/HomePage'

describe('<Index />', () => {
  it('should have image pokeball when loading true', () => {
    render(<HomePage pokemons={[]} loading={true} />)

    expect(screen.getByAltText('pokeball')).toBeInTheDocument()
  })

  it('should have button load more pokemon and se all pokemon', () => {
    render(<HomePage pokemons={[]} loading={false} />)

    const loadMore = screen.getByText('Load More Pokemon')
    const seeAll = screen.getByText('See All Pokemon')

    expect(loadMore).toBeInTheDocument();
    expect(seeAll).toBeInTheDocument();
  })

  it('Pokemon card test. should have name: IVYSAUR as pokemone name. alt image ivysaur. and nickname with value nickname', () => {
    render(<PokemonCard
      name="ivysaur"
      image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
      owned={0}
      nickname="nickname"
    />)
    
    expect(screen.getByText('IVYSAUR')).toBeInTheDocument()
    expect(screen.getByAltText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('nickname')).toBeInTheDocument()
  })
})
