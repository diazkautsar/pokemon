/** @jsxImportSource @emotion/react */
import React from 'react'

const Loading = () => {
  return (
    <div
      css={{
        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
      }}
    >
      <div
        css={{
          textAlign: 'center',
          justifyContent: 'center',
          marginTop: '25%'
        }}
      >
        <div>
          <img
            src={`https://media.giphy.com/media/uLnPIWsqIz2aA/giphy.gif`}
            css={{
              width: '10%',
              height: 'auto',
              borderRadius: '50%'
            }}
          />
        </div>
        <div
          css={{
            color: 'white',
            fontSize: '25px'
          }}
        >
          LOADING
        </div>
      </div>
    </div>
  )
}

export default  Loading
