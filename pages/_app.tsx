import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { Fragment } from 'react';

import { APP_NAME } from '../config';
import { AuthContextProvider } from '../contexts/authContext';
import '../styles/globals.css';
import "react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <AuthContextProvider>
        <Head>
          <title>{APP_NAME}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" />
        </Head>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Fragment>
  )
}

export default MyApp
