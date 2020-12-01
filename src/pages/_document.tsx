import Document, { Html, Head, NextScript } from 'next/document';
import { DocumentContext } from 'next/dist/next-server/lib/document-context';
import { useContext } from 'react';

export function Main() {
  const { inAmpMode, html, docComponentsRendered } = useContext(
    DocumentContext
  );
  docComponentsRendered.Main = true;
  return (
    <div
      id="__next"
      className="vkui-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="vkui">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
