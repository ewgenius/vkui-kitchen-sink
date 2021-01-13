import React from 'react';
import Head from 'next/head';
import { SSRWrapper } from '@vkontakte/vkui';
import KitchenSinkApp from '../apps/KitchenSinkApp';

export default function Index() {
  return (
    <>
      <Head>
        <title>VKUI Kitchen Sink (SSR)</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SSRWrapper>
        <KitchenSinkApp />
      </SSRWrapper>
    </>
  );
}
