import React, { FunctionComponent } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { Header } from './Header'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  .content-wrapper{
    margin-top: 55px;
  }
`

function Layout({ children }: any) {
  return (
    <Container>
      <Header />
      <div className="content-wrapper">
        <section className="wrapper centered">
          {children}
        </section>
      </div>
    </Container>
  )
}

export default Layout
