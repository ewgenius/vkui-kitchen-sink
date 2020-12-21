import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const KitchenSinkApp = dynamic(() => import('../apps/KitchenSinkApp'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <title>VKUI Kitchen Sink (Embedded)</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <h1>VKUI embedded inside</h1>
      <div style={{ width: 1280, border: '1px solid #000' }}>
        <KitchenSinkApp embedded />
      </div>
    </>
  );
}
