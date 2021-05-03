import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MyPokemons from '../pages/mypokemons/index'

describe('My Pokemons', () => {
  it('render no have pokemons', () => {
    render(<MyPokemons />)

    expect(screen.getByAltText('pokeball')).toBeInTheDocument()
    expect(screen.getByText('You Have No Pokemons Yet')).toBeInTheDocument()
  })
})
