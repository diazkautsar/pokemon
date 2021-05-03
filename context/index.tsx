import React, { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react'

type pokemonContextType = {
  imageDetailUrl: string,
  changeImageDetailUrl: (url: string) => void,
}

const pokemonContextDefaultValue: pokemonContextType = {
  imageDetailUrl: null,
  changeImageDetailUrl: (url: string) => {},
}

const PokemonContext = createContext<pokemonContextType>(pokemonContextDefaultValue)

export function usePokemonContext() {
  return useContext(PokemonContext)
}

type Props = {
  children: ReactNode;
}

export function PokemonProvider({ children }: Props) {
  const [imageDetailUrl, setImageDetailUrl] = useState('')

  const changeImageDetailUrl = (url: string) => {
    localStorage.setItem('imageDetailUrl', url)
    setImageDetailUrl(url)
  }

  const value = {
    imageDetailUrl,
    changeImageDetailUrl,
  }

  return (
    <PokemonContext.Provider value={value}>
      { children }
    </PokemonContext.Provider>
  )
}