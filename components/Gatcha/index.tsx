/** @jsxImportSource @emotion/react */
import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'

import Link from 'next/link'

import styled from '@emotion/styled'

type Props = {
  imageUrl?: string,
  name?: string, 
}

type Inputs = {
  nickname: string
}

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const Button = styled('div')`
  padding: 10px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 25px 6px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
`

const ButtonMove: React.FunctionComponent = () => {
  return (
    <div
      css={{
        display: 'flex',
        // justifyContent: 'space-around',
      }}
    >
      <Link href="/">
        <Button> Go To Pokemon List </Button>
      </Link>
      <Link href="/mypokemons">
        <Button> Go To My Pokemons </Button>
      </Link>
    </div>
  )
}

const Gatcha: React.FunctionComponent<Props> = ({ imageUrl, name }) => {
  const { register, getValues } = useForm<Inputs>();
  const [status, setStatus] = React.useState<'success' | 'failed'>(null)
  const [statusVisible, setStatusVisible] = React.useState<boolean>(false)
  const [afterSubmit, setAfterSubmit] = React.useState<boolean>(false)

  const { addToast } = useToasts()

  React.useEffect(() => {
    const number = Math.floor(Math.random() * 2) + 1
    setStatus(null)
    if (number === 1) {
      setStatus('success')
    } else {
      setStatus('failed')
    }

    setAfterSubmit(false)

    setTimeout(() => {
      setStatusVisible(true)
    }, 3000)
  }, [])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existingList = JSON.parse(localStorage.getItem('myPokemons'))
    const { nickname } = getValues()

    if (!existingList) {
      const myPokemons = [{
        nickname,
        name,
        imageUrl,
      }]
  
      localStorage.setItem('myPokemons', JSON.stringify(myPokemons))
  
      addToast('Success add pokemon to my pokemon list', {
        appearance: 'success'
      })

      setAfterSubmit(true)
    } else {
      const findPokemon = existingList.find(item => item.name === name && item.nickname.toLowerCase() === nickname.toLowerCase())

      if (findPokemon) {
        addToast('Name already exists for this pokemon', {
          appearance: 'error'
        })
      } else {
        const myPokemons = [{
          nickname,
          name,
          imageUrl,
        }]

        const updatePokemonsWithExisting = existingList.concat(myPokemons)

        localStorage.setItem('myPokemons', JSON.stringify(updatePokemonsWithExisting))
  
        addToast('Success add pokemon to my pokemon list', {
          appearance: 'success'
        })
        setAfterSubmit(true)
      }

    }
  }


  return (
    <div
      css={{
        [mq[1]]: {
          marginTop: '3rem',
        },
      }}
    >
      {
        !statusVisible ? (
          <Image
            src="/pokeball.png"
            alt="pokeball"
            width={250}
            height={250}
            css={{
              animation: 'rotation 10s infinite linear',
            }}
          />
        ) : (
          <>
            { status === 'success' ? (
                <>
                  <div className="nickname">
                    <div css={{ marginBottom: '20px' }}> Congratulations </div>
                    {afterSubmit ? (
                      <>
                        <div>
                          <Image
                            src="/happy.png"
                            alt="pokeball"
                            width={150}
                            height={150}
                          />    
                          <div css={{ fontSize: '20px', marginTop: '10px' }}> Success Add Pokemon </div>
                          <div css={{ marginTop: '10px' }}>
                            <ButtonMove />      
                          </div>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={onSubmit}>
                        <div>
                          <input
                            type="name"
                            placeholder="Enter Pokemon Nickname"
                            css={{
                              boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 25px 6px',
                              backgroundColor: 'white',
                              border: '1px solid white',
                              width: '300px',
                              height: '50px',
                              textAlign: 'center',
                              fontSize: '20px',
                              borderRadius: '5px'
                            }}
                            {...register('nickname', { required: true })}
                          />
                        </div>
                        <div>
                          <input
                            type="submit"
                            css={{
                              padding: '10px',
                              boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 25px 6px',
                              backgroundColor: 'white',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              width: '100px',
                              marginTop: '20px',
                              borderColor: 'white'
                            }}
                          />
                        </div>
                      </form>
                    )}
                  </div>
              </>
            ) : status === 'failed' && (
              <>
                <div>
                  <Image
                    src="/sad.png"
                    alt="pokeball"
                    width={150}
                    height={150}
                  />    
                  <div css={{ fontSize: '20px', marginTop: '10px' }}> Catch failed. </div>
                  <div css={{ marginTop: '10px' }}>
                    <ButtonMove />      
                  </div>
                </div>
              </>
            )}
          </>
        )
      }
    </div>
  )
}

export default Gatcha