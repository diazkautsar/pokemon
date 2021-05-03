/** @jsxImportSource @emotion/react */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar: React.FunctionComponent = () => {
  return (
    <div
      css={{
        width: '100%',
        boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '.5rem',
        overflow: 'hidden',
        top: '0',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link href="/">
        <div className="navbar-icon" css={{ cursor: 'pointer' }}>
          <Image
            src="/pokemon-logo.png"
            alt="Pokemon"
            width={150}
            height={50}
          />
        </div>
      </Link>
      <Link href="/mypokemons">
        <div className="navbar-save" css={{ textAlign: 'center', cursor: 'pointer' }}>
          <Image
            src="/pokemon-saves.png"
            alt="Pokemon"
            width={50}
            height={50}
          />
          <div> My Pokemon </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
