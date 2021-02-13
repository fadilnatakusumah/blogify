import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const { renderPage } = ctx;

    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    const initialProps = await Document.getInitialProps(ctx)

    // Step 4: Pass styleTags as a prop
    return { ...initialProps, ...page, styleTags }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
