import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Index from '../pages/index'


describe('<Index />', () => {
  it('shoulde have main', () => {
    render(<Index />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument();
  })
})
