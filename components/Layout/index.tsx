/** @jsxImportSource @emotion/react */
import React, { } from 'react'
import Navbar from '../Navbar'

type Props = {
  Component: any
}

const Layout: React.FunctionComponent<Props> = ({ Component, ...props }) => {
  return (
    <>
      <Navbar/>
      <Component {...props} />
    </>
  )
}

export default Layout