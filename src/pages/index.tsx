import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const KitchenSinkApp = dynamic(() => import('../components/KitchenSinkApp'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <title>VKUI Kitchen Sink</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <KitchenSinkApp />
    </>
  );
}
