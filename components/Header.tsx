import Link from 'next/link';
import styled from "styled-components";
import Nprogress from "nprogress";
import Router, { useRouter } from "next/router";
import { useAuthContextValue } from '../contexts/authContext';
import React, { Fragment, useEffect } from 'react';
import { signout } from '../api/auth';

const HeaderStyled = styled.header`
 background-color: #000;
  width: 100%;
  /* z-index: 13; */
  position: fixed;
  color: white;

  >div nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    .right{
      a {
        cursor: pointer;
        padding: 8px 12px;
        transition: .3s ease-out;
        margin-left: 10px;

        &:hover{
          background-color: #ccc;
          color: #000;
        }
      }

      .primary{
        background-color: var(--accent-color);
        color: white;

        &:hover{
          background-color: var(--light-accent-color);
          color:white;
        }
      }
    }
  }
`;

(Router as any).onRouteChangeStart = (url: string) => Nprogress.start();
(Router as any).onRouteChangeComplete = (url: string) => Nprogress.done();
(Router as any).onRouteChangeError = (url: string) => Nprogress.start();

export function Header() {
  const { authState, setAuthState } = useAuthContextValue();
  const router = useRouter();
  const onSignoutHandler = () => {
    signout()
      .then(() => {
        setAuthState!({ user: null, token: '' });
        router.replace('/signin')
      });
  }

  const isSignedIn = () => authState?.user !== null;

  useEffect(() => {
    if (router.pathname === "/" && isSignedIn()) {
      router.replace('/home')
    }
  }, [isSignedIn])


  return (
    <HeaderStyled>
      <div className="wrapper centered">
        <nav>
          <div>
            <h2>
              <Link href={isSignedIn() ? '/home' : '/'}>🚀 Blogify</Link>
            </h2>
          </div>
          <div className="right">
            {isSignedIn()
              ?
              <Fragment>
                <Link href="/blog/create" passHref>
                  <a className="primary">Write a blog</a>
                </Link>
                <a onClick={onSignoutHandler}>Sign out</a>
              </Fragment>
              :
              <Fragment>
                <Link href="/signin">Sign in</Link>
                <Link href="/signup" passHref>
                  <a className="primary">Sign up</a>
                </Link>
              </Fragment>
            }
          </div>
        </nav>
      </div>
    </HeaderStyled>
  )
}
