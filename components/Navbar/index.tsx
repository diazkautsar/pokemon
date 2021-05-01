/** @jsxImportSource @emotion/react */
import React from 'react'
import Image from 'next/image'

const Navbar: React.FunctionComponent = () => {
  return (
    <div
      css={{
        width: '100%',
        boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '.75rem',
        overflow: 'hidden',
        top: '0',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className="navbar-icon">
        <Image
          src="/pokemon-logo.png"
          alt="Pokemon"
          width={150}
          height={50}
        />
      </div>
    </div>
  )
}

export default Navbar
