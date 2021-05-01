/** @jsxImportSource @emotion/react */
import React, { } from 'react'
import Head from 'next/head'
import Navbar from '../Navbar'

type Props = {
  Component: any
}

const Layout: React.FunctionComponent<Props> = ({ Component, ...props }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <Component {...props} />
    </>
  )
}

export default Layout