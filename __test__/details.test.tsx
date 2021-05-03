import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PokemonDetail from '../pages/pokemon/[...name]'
import Tag from '../components/Tag'

const pokemon = {
  __typename: 'typename',
  id: 1,
  name: 'ivysaur',
  abilities: [],
  moves: [],
  types: [],
  message: 'success',
  status: true,
}

const name = {
  name: 'ivysaur'
}

describe('Page Pokemon Detail', () => {
  it('should have pokemon name IVYSAUR', () => {
    render(<PokemonDetail name='ivysaur' pokemon={pokemon} />)

    expect(screen.getByText(name.name.toUpperCase())).toBeInTheDocument()
  })

  it('should have element for list abilities pokemon', () => {
    render(<PokemonDetail name='ivysaur' pokemon={pokemon} />)

    expect(screen.getByText('ABILITIES')).toBeInTheDocument()
  })

  it('should have element for list moves pokemon', () => {
    render(<PokemonDetail name='ivysaur' pokemon={pokemon} />)

    expect(screen.getByText('MOVES')).toBeInTheDocument()
  })

  it('should render a tag component for types of pokemon, with name = IVYSAUR and color = rgb(255, 203, 5)', () => {
    render(<Tag name="IVYSAUR" types="type" />)

    expect(screen.getByTestId('tag')).toHaveStyle({ borderColor: 'rgb(255, 203, 5)', color: 'rgb(255, 203, 5)' })
    expect(screen.getByText('IVYSAUR')).toBeInTheDocument()
  })

  it('should render a tag component for abilities of pokemon. with name = overgrow and color = red', () => {
    render(<Tag name="overgrow" types="abilities" />)

    expect(screen.getByTestId('tag')).toHaveStyle({ borderColor: 'red', color: 'red' })
    expect(screen.getByText('overgrow')).toBeInTheDocument()
  })

  it('should render a tag component for moves of pokemon. with name = bind and color = #4b7cf3', () => {
    render(<Tag name="bind" types="move" />)

    expect(screen.getByTestId('tag')).toHaveStyle({ borderColor: '#4b7cf3', color: '#4b7cf3' })
    expect(screen.getByText('bind')).toBeInTheDocument()
  })
})